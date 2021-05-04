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
}
