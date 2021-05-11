import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { PartialType, PickType } from '@nestjs/swagger';
import { status } from '../utils/enums';

export class TeamDto {
  @IsUUID()
  id: string;

  @IsString()
  name: string;

  @IsUUID()
  coach: string;

  @IsUUID()
  @IsOptional()
  captain?: string | null;

  @IsString()
  @ApiProperty({ enum: status })
  @IsEnum(status)
  status: status;
}

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
  constructor(config: { status: status }) {
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
