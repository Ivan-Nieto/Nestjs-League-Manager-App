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
import { TeamDto } from './team.dto';
import { StatusValidationPipe } from './validationPipes/StatusValidationPipe';
import { RoleValidationPipe } from './validationPipes/RoleValidationPipe';
import { PatchTeamValidationPipe } from './validationPipes/PatchTeamValidationPipe';
import { PatchTeamStatusValidationPipe } from './validationPipes/PatchTeamStatusValidationPipe';

@Controller('team')
export class TeamController {
  constructor(private teamService: TeamService) {}

  @Get()
  getAllTeams() {
    return this.teamService.getTeams();
  }

  @Post()
  addTeam(@Body(CreateTeamValidationPipe) team: TeamDto) {
    return this.teamService.createTeam(team);
  }

  @Get(':teamId')
  getTeam(@Param('teamId', TeamIdValidationPipe) teamId: string) {
    return this.teamService.getTeam(teamId);
  }

  @Get(':teamId/matches')
  getTeamMatches(@Param('teamId', TeamIdValidationPipe) teamId: string) {
    return this.teamService.getTeamMatches(teamId);
  }

  @Get(':teamId/member')
  getTeamMembers(
    @Param('teamId', TeamIdValidationPipe) teamId: string,
    @Query('status', StatusValidationPipe) status?: string,
    @Query('role', RoleValidationPipe) role?: string,
  ) {
    return this.teamService.getMembers(teamId, status, role);
  }

  @Get(':teamId/stats')
  getTeamStats(@Param('teamId', TeamIdValidationPipe) teamId: string) {
    return this.teamService.getStats(teamId);
  }

  @Patch(':teamId')
  patchTeam(
    @Param('teamId', TeamIdValidationPipe) teamId: string,
    @Body(PatchTeamValidationPipe) config: Partial<TeamDto>,
  ) {
    return this.teamService.updateTeam(teamId, config);
  }

  @Patch(':teamId/status')
  patchStatus(
    @Param('teamId', TeamIdValidationPipe) teamId: string,
    @Body(PatchTeamStatusValidationPipe) status: string,
  ) {
    return this.teamService.updateTeam(teamId, { status });
  }

  @Delete(':teamId')
  deleteTeam(@Param('teamId', TeamIdValidationPipe) teamId: string) {
    return this.teamService.deleteTeam(teamId);
  }
}
