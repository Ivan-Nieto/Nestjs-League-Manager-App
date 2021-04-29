import { Module } from '@nestjs/common';
import { MemberModule } from './member/member.module';
import { PersonModule } from './person/person.module';
import { TeamModule } from './team/team.module';
import { MatchModule } from './match/match.module';

@Module({
  imports: [MemberModule, PersonModule, TeamModule, MatchModule],
})
export class AppModule {}
