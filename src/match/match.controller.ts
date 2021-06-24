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
import { MatchService } from './match.service';
import { PatchMatchDto, CreateMatchDto } from './match.dto';
import { ApiTags } from '@nestjs/swagger';
import { ValidateDtoPipe } from '../utils/ValidateDtoPipe';

@Controller('match')
@ApiTags('Match')
export class MatchController {
  constructor(private matchService: MatchService) {}

  @Get()
  getAllMatches() {
    return this.matchService.getAllMatches();
  }

  @Post()
  addMatch(@Body(new ValidateDtoPipe(CreateMatchDto)) match: CreateMatchDto) {
    return this.matchService.addMatch(match);
  }

  @Get(':matchId')
  getMatch(@Param('matchId', MatchIdValidationPipe) matchId: string) {
    return this.matchService.getMatch(matchId);
  }

  @Patch(':matchId')
  patchMatch(
    @Param('matchId', MatchIdValidationPipe) matchId: string,
    @Body(new ValidateDtoPipe(PatchMatchDto)) config: PatchMatchDto,
  ) {
    return this.matchService.updateMatch(matchId, config);
  }

  @Delete(':matchId')
  deleteMatch(@Param('matchId', MatchIdValidationPipe) matchId: string) {
    return this.matchService.delete(matchId);
  }
}
