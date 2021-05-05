import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { MatchIdValidationPipe } from './validationPipes/MatchIdValidationPipe';
import { CreateMatchValidationPipe } from './validationPipes/CreateMatchValidationPipe';
import { MatchService } from './match.service';
import { MatchDto } from './match.dto';

@Controller('match')
export class MatchController {
  constructor(private matchService: MatchService) {}

  @Get()
  getAllMatches() {
    return this.matchService.getAllMatches();
  }

  @Post()
  addMatch(@Body(CreateMatchValidationPipe) match: MatchDto) {
    return this.matchService.addMatch(match);
  }

  @Get(':matchId')
  getMatch(@Param('matchId', MatchIdValidationPipe) matchId: string) {
    return this.matchService.getMatch(matchId);
  }

  @Patch(':matchId')
  patchMatch(@Param('matchId', MatchIdValidationPipe) matchId: string) {
    console.log('PATCH match/:matchId', matchId);
    return this.matchService.notImplemented();
  }

  @Delete(':matchId')
  deleteMatch(@Param('matchId', MatchIdValidationPipe) matchId: string) {
    console.log('DELETE match/', matchId);
    return this.matchService.notImplemented();
  }
}
