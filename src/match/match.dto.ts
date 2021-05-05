import { IsDate, IsNumber, IsString, IsUUID, Min } from 'class-validator';
import { PrimaryColumn } from 'typeorm';

export class MatchDto {
  @PrimaryColumn()
  @IsUUID()
  id: string;

  @IsUUID()
  home?: string;

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
  location: 'active' | 'inactive';
}
