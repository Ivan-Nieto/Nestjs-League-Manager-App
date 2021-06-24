import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { PartialType, PickType } from '@nestjs/swagger';
import { teamStatus } from '../utils/enums';

export class TeamDto {
  @IsUUID()
  id: string;

  @IsString()
  @ApiProperty({ example: 'Team A' })
  name: string;

  @IsUUID()
  @ApiProperty({ example: '00000000-0000-4000-A000-000000000000' })
  coach: string;

  @IsUUID()
  @IsOptional()
  @ApiProperty({ example: '00000000-0000-4000-A000-000000000000' })
  captain?: string | null;

  @IsString()
  @ApiProperty({ enum: teamStatus })
  @IsEnum(teamStatus)
  @ApiProperty({ example: 'active' })
  status: teamStatus;
}

export class InitializeTeamDto extends PartialType(TeamDto) {}

export class CreateTeamDto extends OmitType(TeamDto, ['id']) {
  constructor(config?: Record<string, any>) {
    super();
    ['name', 'coach', 'captain', 'status'].forEach((k) =>
      config[k] == null ? null : (this[k] = config[k]),
    );
  }
}

export class PatchTeamDto extends PartialType(CreateTeamDto) {
  constructor(config?: Record<keyof CreateTeamDto, any>) {
    super();
    ['name', 'coach', 'captain', 'status'].forEach((k) =>
      config[k] == null ? null : (this[k] = config[k]),
    );
  }
}

export class PatchStatusDto extends PickType(CreateTeamDto, ['status']) {
  constructor(config: { status: teamStatus }) {
    super(config);
    this.status = config.status;
  }
}

export class TeamIdDto extends PickType(TeamDto, ['id']) {
  constructor(config: { id: string }) {
    super();
    this.id = config.id;
  }
}
