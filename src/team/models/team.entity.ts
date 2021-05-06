import { IsOptional, IsString, IsUUID } from 'class-validator';
import { Column, Entity, OneToOne, PrimaryColumn } from 'typeorm';
import { Member } from '../../member/models/member.entity';

@Entity()
export class Team {
  @PrimaryColumn({ type: 'uuid' })
  @IsUUID()
  id: string;

  @Column()
  @IsString()
  name: string;

  @Column({ type: 'uuid' })
  @IsUUID()
  @OneToOne(() => Member)
  coach: string;

  @Column({ type: 'uuid' })
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

  public toObject() {
    return {
      id: this.id,
      name: this.name,
      coach: this.coach,
      captain: this.captain,
      status: this.status,
    };
  }
}
