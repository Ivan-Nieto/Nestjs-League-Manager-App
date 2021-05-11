import { ApiProperty, OmitType, PickType } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsString, IsUUID, Min } from 'class-validator';
import { PartialType } from '@nestjs/swagger';
import validObject from '../utils/validObject';
import { location } from '../utils/enums';

export class MatchDto {
  @IsUUID()
  id: string;

  @IsUUID()
  home: string;

  @IsUUID()
  team: string;

  @IsNumber()
  @Min(0)
  'home-score': number;

  @IsNumber()
  @Min(0)
  'away-score': number;

  @IsDateString()
  played: Date;

  @IsString()
  @ApiProperty({ enum: location })
  location: location;

  @IsUUID()
  staff: string;

  constructor(config?: {
    id?: string;
    home?: string;
    team?: string;
    'home-score'?: number;
    'away-score'?: number;
    played?: string;
    location?: location;
    staff?: string;
  }) {
    if (!config || Object.keys(config).length === 0) return;
    if (!validObject(config) || Object.keys(config).length === 0) return;

    [
      'id',
      'home',
      'team',
      'home-score',
      'away-score',
      'played',
      'location',
      'staff',
    ].forEach((e) => (config[e] == null ? null : (this[e] = config[e])));
  }
}

export class MatchIdDto extends PickType(MatchDto, ['id']) {
  constructor(config: { id?: string }) {
    super(config);
    if (!validObject(config) || Object.keys(config).length === 0) return;
    this.id = config.id;
  }
}

export class CreateMatchDto extends OmitType(MatchDto, ['id']) {
  constructor(config: Record<keyof MatchDto, any>) {
    super(config);
    if (!validObject(config) || Object.keys(config).length === 0) return;
    [
      'home',
      'team',
      'home-score',
      'away-score',
      'played',
      'location',
      'staff',
    ].forEach((e) => (config[e] == null ? null : (this[e] = config[e])));
  }
}

export class PatchMatchDto extends OmitType(PartialType(MatchDto), ['id']) {
  constructor(config: Record<keyof CreateMatchDto, any>) {
    super(config);
    if (!validObject(config) || Object.keys(config).length === 0) return;
    [
      'home',
      'team',
      'home-score',
      'away-score',
      'played',
      'location',
      'staff',
    ].forEach((e) => (config[e] == null ? null : (this[e] = config[e])));
  }
}
