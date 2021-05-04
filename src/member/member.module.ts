import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MemberController } from './member.controller';
import { MemberService } from './member.service';
import { Member } from './models/member.entity';
import { Person } from '../person/models/person.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Member, Person])],
  controllers: [MemberController],
  providers: [MemberService],
})
export class MemberModule {}
