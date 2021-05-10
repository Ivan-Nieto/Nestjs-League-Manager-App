import { ApiProperty, OmitType, PickType } from '@nestjs/swagger';
import { IsDate, IsNumber, IsString, IsUUID, Min } from 'class-validator';
import { PartialType } from '@nestjs/swagger';
import validObject from 'src/utils/validObject';

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

  @IsDate()
  played: Date;

  @IsString()
  @ApiProperty({ enum: ['active', 'inactive'] })
  location: 'active' | 'inactive';

  constructor(config?: {
    id?: string;
    home?: string;
    team?: string;
    'home-score'?: number;
    'away-score'?: number;
    played?: string;
    location?: 'active' | 'inactive';
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
    ].forEach((e) => (config[e] == null ? null : (this[e] = config[e])));
  }
}
