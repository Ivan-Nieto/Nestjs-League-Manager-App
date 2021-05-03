import { HttpException, Injectable } from '@nestjs/common';
import { Member } from './models/Member';
@Injectable()
export class MemberService {
  async createMember() {
    const member = new Member('' as any);

    await member.create();

    return 'Done';
  }

  public notImplemented() {
    throw new HttpException('Not Implemented', 500);
  }
}
