import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MemberController } from './member/member.controller';
import { MemberService } from './member/member.service';
import { MemberModule } from './member/member.module';
import { PersonController } from './person/person.controller';
import { PersonService } from './person/person.service';
import { PersonModule } from './person/person.module';
import { TeamController } from './team/team.controller';
import { TeamService } from './team/team.service';
import { TeamModule } from './team/team.module';
import { MatchController } from './match/match.controller';
import { MatchService } from './match/match.service';
import { MatchModule } from './match/match.module';

@Module({
  imports: [MemberModule, PersonModule, TeamModule, MatchModule],
  controllers: [AppController, MemberController, PersonController, TeamController, MatchController],
  providers: [AppService, MemberService, PersonService, TeamService, MatchService],
})
export class AppModule {}
