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

@Controller('match')
export class MatchController {
  constructor(private matchService: MatchService) {}

  @Post()
  addMatch(@Body(CreateMatchValidationPipe) match: Record<string, any>) {
    console.log('POST match/', match);
    return this.matchService.notImplemented();
  }

  @Get(':matchId')
  getMatch(@Param('matchId', MatchIdValidationPipe) matchId: string) {
    console.log('GET match/:matchId', matchId);
    return this.matchService.notImplemented();
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
