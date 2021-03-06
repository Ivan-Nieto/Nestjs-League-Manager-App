import { Module } from '@nestjs/common';
import { MemberModule } from './member/member.module';
import { PersonModule } from './person/person.module';
import { TeamModule } from './team/team.module';
import { MatchModule } from './match/match.module';
import { DatabaseModule } from './database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StaffModule } from './staff/staff.module';
import { AuditModule } from './audit/audit.module';
import config from './database/config/ormconfig';

@Module({
  imports: [
    DatabaseModule,
    MemberModule,
    PersonModule,
    TeamModule,
    MatchModule,
    TypeOrmModule.forRoot(config),
    StaffModule,
    AuditModule,
  ],
})
export class AppModule {}
