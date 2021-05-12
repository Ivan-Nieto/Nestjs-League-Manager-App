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
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { TeamIdValidationPipe } from './validationPipes/TeamIdValidationPipe';
import { CreateTeamDto, PatchTeamDto, PatchStatusDto } from './team.dto';
import {
  UpdatePersonRoleDto,
  UpdatePersonStatusDto,
} from '../person/person.dto';
import {
  ValidateDtoPipe,
  ValidateDtoValuePipe,
} from '../utils/ValidateDtoPipe';

@Controller('team')
@ApiTags('Team')
export class TeamController {
  constructor(private teamService: TeamService) {}

  @Get()
  getAllTeams() {
    return this.teamService.getTeams();
  }

  @Post()
  addTeam(@Body(new ValidateDtoPipe(CreateTeamDto)) team: CreateTeamDto) {
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
    @Query(
      'status',
      new ValidateDtoValuePipe(UpdatePersonStatusDto, 'status', true),
    )
    status?: string,
    @Query('role', new ValidateDtoValuePipe(UpdatePersonRoleDto, 'role', true))
    role?: string,
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
    @Body(new ValidateDtoPipe(PatchTeamDto)) config: PatchTeamDto,
  ) {
    return this.teamService.updateTeam(teamId, config);
  }

  @Patch(':teamId/status')
  patchStatus(
    @Param('teamId', TeamIdValidationPipe) teamId: string,
    @Body(new ValidateDtoPipe(PatchStatusDto)) data: PatchStatusDto,
  ) {
    return this.teamService.updateTeam(teamId, data);
  }

  @Delete(':teamId')
  deleteTeam(@Param('teamId', TeamIdValidationPipe) teamId: string) {
    return this.teamService.deleteTeam(teamId);
  }
}
