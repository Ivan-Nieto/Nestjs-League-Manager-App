import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MemberController } from './member.controller';
import { MemberService } from './member.service';
import { Member } from './models/member.entity';
import { Person } from '../person/models/person.entity';
import { TeamService } from '../team/team.service';
import { Team } from 'src/team/models/team.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Member, Person, Team])],
  controllers: [MemberController],
  providers: [MemberService, TeamService],
})
export class MemberModule {}
