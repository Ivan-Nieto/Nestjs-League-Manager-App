import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { MatchController } from './match.controller';
import { MatchService } from './match.service';
import { Match } from './models/match.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Match])],
  controllers: [MatchController],
  providers: [MatchService],
})
export class MatchModule {}
