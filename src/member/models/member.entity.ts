import { IsNumber, IsString, IsUUID } from 'class-validator';
import { Column, Entity, OneToOne, PrimaryColumn } from 'typeorm';
import { Person } from '../../person/models/person.entity';
import { Team } from '../../team/models/team.entity';

@Entity()
export class Member {
  @PrimaryColumn()
  @IsUUID()
  id: string;

  @Column()
  @IsUUID()
  @OneToOne(() => Person)
  person_id: string;

  @Column()
  @IsString()
  role: string;

  @Column()
  @IsString()
  status: string;

  @Column()
  @IsNumber()
  balance: number;

  @Column()
  @IsString()
  @OneToOne(() => Team)
  team_id: string | null;

  @Column({ type: 'jsonb' })
  stats: {
    shots_on_goal: number;
  };

  constructor(config?: {
    id?: string;
    person_id?: string;
    role?: string;
    status?: string;
    balance?: number;
    team_id?: string;
    stats?: {
      shots_on_goal?: number;
    };
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
