import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Member as MemberEntity } from './member.entity';

export class Member {
  constructor(
    @InjectRepository(MemberEntity)
    private connection: Repository<MemberEntity>,
  ) {}

  create() {
    // Create a member
    const member = new MemberEntity();
    member.id = 'id';
    this.connection.manager.save(member);
  }
}
