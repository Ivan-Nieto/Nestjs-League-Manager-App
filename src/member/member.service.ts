import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UpdateObject } from './validationPipes/UpdateMemberValidationPipe';
import { Member as MemberEntity } from './models/member.entity';
import { Member } from './models/Member';
import { Person } from '../person/models/person.entity';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(MemberEntity)
    private connection: Repository<MemberEntity>,
  ) {}

  private notFound(): never {
    throw new HttpException('Not Found', 404);
  }

  async createMember(config: Record<string, any>) {
    const member = new Member(this.connection, config);

    await member.create();

    return 'Done';
  }

  public getMembers() {
    return this.connection
      .createQueryBuilder('m')
      .select(['*', 'm.id AS id'])
      .innerJoin(Person, 'p', 'm.person_id = p.id')
      .getRawMany()
      .catch(console.error);
  }

  public async getMember(memberId: string) {
    const member = await this.connection
      .createQueryBuilder('m')
      .select(['*', 'm.id AS id'])
      .innerJoin(Person, 'p', 'm.person_id = p.id')
      .where('m.id = :memberId', { memberId })
      .getRawOne()
      .catch(console.error);

    if (!member) throw new HttpException('Not Found', 404);

    return member;
  }

  public getFreeAgents() {
    return this.connection.find({ where: { team_id: null } });
  }

  public async makePayment(memberId: string, amount: number) {
    // Make sure member exists
    const member = await this.connection.findOne(memberId).catch(this.notFound);
    if (!Boolean(member)) this.notFound();

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

  public async updateMember(memberId: string, data: UpdateObject) {
    // Make sure member exists
    const member = await this.connection.findOne(memberId).catch(this.notFound);
    if (!member) this.notFound();

    // Extract fields from object
    const extract = (fields: string[]): Record<string, any> => {
      const tempObj: Record<string, any> = {};
      fields.forEach((k) => (data[k] == null ? null : (tempObj[k] = data[k])));
      return tempObj;
    };

    // Separate member and person data
    const memberFields = extract([
      'role',
      'status',
      'balance',
      'team_id',
      'stats',
    ]);
    const personFields = extract([
      'name',
      'last_name',
      'phone',
      'email',
      'dob',
      'age',
    ]);

    // Update member
    if (Object.keys(memberFields).length)
      await this.connection.update(memberId, memberFields).catch((error) => {
        console.error(error);
        throw new HttpException('Failed to update member', 500);
      });

    // Update person
    if (Object.keys(personFields).length)
      await this.connection.manager
        .update(Person, { id: member.person_id }, personFields)
        .catch((error) => {
          console.error(error);
          throw new HttpException('Failed to update person', 500);
        });

    return 'Done';
  }

  public async deleteMember(memberId: string) {
    // Make sure member exists
    const member = await this.connection
      .findOne({ id: memberId })
      .catch(this.notFound);

    if (!member) this.notFound();

    await this.connection
      .delete({ id: memberId })
      .then((data) => {
        if (data.affected === 0)
          throw new HttpException('Failed to delete member', 500);

        return 'Done';
      })
      .catch((error) => {
        console.error(error);
        throw new HttpException('Failed to delete member', 500);
      });

    return this.connection.manager
      .delete(Person, { id: member.person_id })
      .then((data) => {
        if (data.affected === 0)
          throw new HttpException('Failed to delete person', 500);

        return 'Done';
      })
      .catch((error) => {
        console.error(error);
        throw new HttpException('Failed to delete person', 500);
      });
  }

  public async patchUserStatus(memberId: string, status: string) {
    return this.updateMember(memberId, { status });
  }
}
