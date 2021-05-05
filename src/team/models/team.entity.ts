import { IsOptional, IsString, IsUUID } from 'class-validator';
import { Column, Entity, OneToOne, PrimaryColumn } from 'typeorm';
import { Member } from '../../member/models/member.entity';

@Entity()
export class Team {
  @PrimaryColumn()
  @IsUUID()
  id: string;

  @Column()
  @IsString()
  name: string;

  @Column()
  @IsUUID()
  @OneToOne(() => Member)
  coach: string;

  @Column()
  @IsOptional()
  @IsUUID()
  @OneToOne(() => Member)
  captain: string | null;

  @Column()
  @IsString()
  status: 'active' | 'inactive';

  constructor(config?: {
    id?: string;
    name?: string;
    coach?: string;
    captain?: string | null;
    status?: 'active' | 'inactive';
  }) {
    if (!config || Object.keys(config).length === 0) return;

    ['id', 'name', 'coach', 'captain', 'status'].forEach((e) =>
      config[e] == null ? null : (this[e] = config[e]),
    );
  }
}
