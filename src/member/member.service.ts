import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Member, NEW_MEMBER_INITIAL_FEE } from './models/member.entity';
import { PatchMemberDto, PostMemberDto } from './member.dto';
import { status } from '../utils/enums';
import { TeamService } from '../team/team.service';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(Member)
    private connection: Repository<Member>,
    private teamService: TeamService,
  ) {}

  /**
   * @description Finds member by it's uuid and throws 404 error if not found
   *
   * @param {string} memberId Member uuid
   * @returns {Member}
   */
  private async exists(memberId: string): Promise<Member> {
    const member = await this.connection.findOne(memberId).catch((error) => {
      console.error(error);
      throw new HttpException('Failed to validate member', 500);
    });

    if (!member) this.notFound();
    return member;
  }

  /**
   * @description Throws a 404 error
   * @throws
   *
   * @param {string} [message] Error message
   */
  private notFound(message?: string): never {
    throw new HttpException(message || 'Not Found', 404);
  }

  /**
   * @description Logs and throws internal error
   * @throws
   *
   * @param {Error} [error] Error object
   */
  private internal(error?: any): never {
    if (error) console.error(error);
    throw new HttpException('Internal Error', 500);
  }

  /**
   * @description Creates a new member
   *
   * @param {PostMemberDto} config New Member information
   * @returns {string} Done
   */
  public async createMember(config: PostMemberDto): Promise<string> {
    const member = new Member(config);

    // Make sure balance is not less than zero
    if (config.balance < 0)
      throw new HttpException('Balance cannot be less than zero', 400);

    // Make sure team exists if provided and slots are available
    if (config.team_id) {
      await this.teamService.exists(config.team_id);
      const availableMemberSlots = await this.teamService.getNumMembersLeft(
        config.team_id,
      );
      if (availableMemberSlots - 1 < 0)
        throw new HttpException('Max number of team members exceeded', 400);
    }

    // Add new member fee and set status to inactive
    member.balance = member.balance + NEW_MEMBER_INITIAL_FEE;
    member.status = status.inactive;

    return this.connection
      .save(member)
      .then(() => 'Done')
      .catch((error) => {
        console.error(error);
        throw new HttpException('Failed to create new member', 500);
      });
  }

  /**
   * @description Gets all members
   *
   * @returns {Array<Member>}
   */
  public async getMembers(): Promise<Array<Member>> {
    return this.connection.find().catch(this.internal);
  }

  /**
   * @description Finds a member by it's uuid
   *
   * @param {string} memberId Member uuid
   * @returns {Member}
   */
  public async getMember(memberId: string): Promise<Member> {
    const member = await this.connection.findOne(memberId).catch(this.internal);

    if (!member) throw new HttpException('Not Found', 404);

    return member;
  }

  /**
   * @description Finds all free agents (members with no team)
   *
   * @returns {Array<Member>} All Members with no defined team_id
   */
  public async getFreeAgents(): Promise<Array<Member>> {
    return this.connection.find({ where: { team_id: null } });
  }

  /**
   * @description Decrement a Members balance by a given amount
   *
   * @param {string} memberId Member uuid
   * @param {number} amount Amount to decrement balance by
   * @returns {string} Done
   */
  public async makePayment(memberId: string, amount: number): Promise<string> {
    // Make sure member exists
    const member = await this.exists(memberId);

    // Get updated balance
    const balance = (member.balance || 0) - amount;
    if (balance < 0)
      throw new HttpException(
        'Balance cannot be less than zero after payment is applied',
        400,
      );

    member.update({ balance });
    if (balance === 0 && member.status === status.inactive)
      member.status = status.active;

    return this.connection
      .save(member)
      .then(() => 'Done')
      .catch((error) => {
        console.error(error);
        throw new HttpException('Failed to update member', 500);
      });
  }

  /**
   * @description Updates a Members information
   *
   * @param {string} memberId Member uuid
   * @param {PatchMemberDto} data Member update data
   * @returns {string} Done
   */
  public async updateMember(
    memberId: string,
    data: PatchMemberDto,
  ): Promise<string> {
    // Make sure member exists
    const member = await this.exists(memberId);

    // Make sure balance is not less than zero
    if (data.balance < 0)
      throw new HttpException('Balance cannot be less than zero', 400);

    // Make sure team exists if provided and slots are available
    if (data.team_id && data.team_id !== member.team_id) {
      await this.teamService.exists(data.team_id);
      const availableMemberSlots = await this.teamService.getNumMembersLeft(
        data.team_id,
      );
      if (availableMemberSlots - 1 < 0)
        throw new HttpException('Max number of team members exceeded', 400);
    }

    // Set captain or coach to null for members old team if member is being reassigned
    if (
      member.team_id &&
      ((!Boolean(data.team_id) && member.team_id) ||
        (data.team_id && data.team_id !== member.team_id))
    ) {
      const team = await this.teamService.exists(member.team_id);
      await this.teamService.updateTeam(member.team_id, {
        ...(team.captain === memberId ? { captain: null } : {}),
        ...(team.coach === memberId ? { coach: null } : {}),
      });
    }

    member.update(data);
    return this.connection
      .save(member)
      .then(() => 'Done')
      .catch((error) => {
        console.error(error);
        throw new HttpException('Failed to update member', 500);
      });
  }

  /**
   * @description Deletes a member
   *
   * @param {string} memberId Member uuid
   * @returns {string} Done
   */
  public async deleteMember(memberId: string): Promise<string> {
    // Make sure member exists
    await this.exists(memberId);

    const failure = new HttpException('Failed to delete member', 500);

    return this.connection
      .delete(memberId)
      .then((data) => {
        if (data.affected === 0) throw failure;
        return 'Done';
      })
      .catch((error) => {
        console.error(error);
        throw failure;
      });
  }

  /**
   * @description Updates a Members status
   *
   * @param {string} memberId Member uuid
   * @param {string} status Member status
   * @returns {string} Done
   */
  public async patchUserStatus(
    memberId: string,
    status: status,
  ): Promise<string> {
    return this.updateMember(memberId, { status });
  }
}
