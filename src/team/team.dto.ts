import { IsOptional, IsString, IsUUID } from 'class-validator';

export class TeamDto {
  @IsUUID()
  id: string;

  @IsString()
  name: string;

  @IsUUID()
  coach: string;

  @IsUUID()
  @IsOptional()
  captain: string | null;

  @IsString()
  status: 'active' | 'inactive';
}
