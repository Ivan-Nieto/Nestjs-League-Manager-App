import { IsInt, Min, IsString, IsOptional } from 'class-validator';

export class StatsDto {
  @IsInt()
  @Min(0)
  shots_on_goal: number;
}

export class MemberDto {
  @IsString()
  id: string;

  @IsString()
  @IsOptional()
  person_id?: string;

  @IsString()
  @IsOptional()
  role?: string;

  @IsString()
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
}
