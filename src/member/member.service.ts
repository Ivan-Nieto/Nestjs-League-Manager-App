import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Member } from './models/member.entity';
import { PatchMemberDto, PostMemberDto } from './member.dto';
import { Team } from '../team/models/team.entity';
import { status } from '../utils/enums';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(Member)
    private connection: Repository<Member>,
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

    // Make sure team exists if provided
    if (config.team_id)
      await this.connection.manager
        .findOne(Team, config.team_id)
        .then((t) => {
          if (!t) throw new HttpException('Team not found', 404);
        })
        .catch((error) => {
          console.error(error);
          throw new HttpException('Failed to validate team', 500);
        });

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
   * @description Increments a Members balance by a given amount
   *
   * @param {string} memberId Member uuid
   * @param {number} amount Amount to increment balance by
   * @returns {string} Done
   */
  public async makePayment(memberId: string, amount: number): Promise<string> {
    // Make sure member exists
    const member = await this.exists(memberId);

    // Get updated balance
    const newBalance = (member.balance || 0) + amount;

    return this.connection
      .update(memberId, { balance: newBalance })
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
    await this.exists(memberId);

    return this.connection
      .update(memberId, data)
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
