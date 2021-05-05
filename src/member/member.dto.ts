import { IsInt, Min, IsString, IsOptional, IsUUID } from 'class-validator';

export class StatsDto {
  @IsInt()
  @Min(0)
  shots_on_goal: number;
}

export class MemberDto {
  @IsUUID()
  id: string;

  @IsString()
  @IsOptional()
  person_id?: string;

  @IsString()
  @IsOptional()
  role?: string;

  @IsString()
  @IsOptional()
  status: string;

  @IsInt()
  @IsOptional()
  @Min(0)
  balance?: number;

  @IsString()
  @IsOptional()
  team_id?: string;

  @IsOptional()
  stats?: StatsDto;

  constructor(config?: {
    id?: string;
    person_id?: string;
    role?: string;
    status?: string;
    balance?: number;
    team_id?: string;
    stats?: StatsDto;
  }) {
    if (!config || Object.keys(config).length === 0) return;

    [
      'id',
      'person_id',
      'role',
      'status',
      'balance',
      'team_id',
      'stats',
    ].forEach((e) => (config[e] == null ? null : (this[e] = config[e])));
  }
}
