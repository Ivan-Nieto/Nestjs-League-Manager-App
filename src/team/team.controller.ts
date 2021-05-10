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
import { CreateTeamDto, PatchTeamDto, PatchStatusDto } from './team.dto';
import { StatusValidationPipe } from './validationPipes/StatusValidationPipe';
import { RoleValidationPipe } from './validationPipes/RoleValidationPipe';
import { PatchTeamValidationPipe } from './validationPipes/PatchTeamValidationPipe';
import { PatchTeamStatusValidationPipe } from './validationPipes/PatchTeamStatusValidationPipe';
import { ApiQuery } from '@nestjs/swagger';

@Controller('team')
export class TeamController {
  constructor(private teamService: TeamService) {}

  @Get()
  getAllTeams() {
    return this.teamService.getTeams();
  }

  @Post()
  addTeam(@Body(CreateTeamValidationPipe) team: CreateTeamDto) {
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
  @ApiQuery({ required: false, name: 'status', type: 'string' })
  @ApiQuery({ required: false, name: 'role', type: 'string' })
  getTeamMembers(
    @Param('teamId', TeamIdValidationPipe) teamId: string,
    @Query('status', StatusValidationPipe)
    status?: string,
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
    @Body(PatchTeamValidationPipe) config: PatchTeamDto,
  ) {
    return this.teamService.updateTeam(teamId, config);
  }

  @Patch(':teamId/status')
  patchStatus(
    @Param('teamId', TeamIdValidationPipe) teamId: string,
    @Body(PatchTeamStatusValidationPipe) data: PatchStatusDto,
  ) {
    return this.teamService.updateTeam(teamId, data);
  }

  @Delete(':teamId')
  deleteTeam(@Param('teamId', TeamIdValidationPipe) teamId: string) {
    return this.teamService.deleteTeam(teamId);
  }
}
