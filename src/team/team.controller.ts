import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TeamService } from './team.service';
import { TeamIdValidationPipe } from './validationPipes/TeamIdValidationPipe';
import { CreateTeamValidationPipe } from './validationPipes/CreateTeamValidationPipe';
@Controller('team')
export class TeamController {
  constructor(private teamService: TeamService) {}

  @Post()
  addTeam(@Body(CreateTeamValidationPipe) team: Record<string, any>) {
    console.log('POST team/', team);
    return this.teamService.notImplemented();
  }

  @Get(':teamId')
  getTeam(@Param('teamId', TeamIdValidationPipe) teamId: string) {
    console.log('GET team/:teamId', teamId);
    return this.teamService.notImplemented();
  }

  @Get(':teamId/matches')
  getTeamMatches(@Param('teamId', TeamIdValidationPipe) teamId: string) {
    console.log('GET team/:teamId/matches', teamId);
    return this.teamService.notImplemented();
  }

  @Get(':teamId/member')
  getTeamMembers(
    @Param('teamId', TeamIdValidationPipe) teamId: string,
    @Query('status') status?: string,
    @Query('role') role?: string,
  ) {
    console.log('GET team/:teamId/member', teamId, status, role);
    return this.teamService.notImplemented();
  }

  @Get(':teamId/stats')
  getTeamStats(@Param('teamId', TeamIdValidationPipe) teamId: string) {
    console.log('GET team/:teamId/stats', teamId);
    return this.teamService.notImplemented();
  }

  @Patch(':teamId')
  patchTeam(@Param('teamId', TeamIdValidationPipe) teamId: string) {
    console.log('PATCH team/:teamId', teamId);
    return this.teamService.notImplemented();
  }

  @Patch(':teamId/status')
  patchStatus(
    @Param('teamId', TeamIdValidationPipe) teamId: string,
    @Body() status: Record<string, any>,
  ) {
    console.log('PATCH team/:teamId/status', teamId, status);
    return this.teamService.notImplemented();
  }

  @Delete(':teamId')
  deleteTema(@Param('teamId', TeamIdValidationPipe) teamId: string) {
    console.log('DELETE team/', teamId);
    return this.teamService.notImplemented();
  }
}
