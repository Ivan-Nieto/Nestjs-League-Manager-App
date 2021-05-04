import { Column, Entity, OneToOne, PrimaryColumn } from 'typeorm';
import { Person } from '../../person/models/person.entity';
import { Team } from '../../team/models/team.entity';

@Entity()
export class Member {
  @PrimaryColumn()
  id: string;

  @Column()
  @OneToOne(() => Person)
  person_id: string;

  @Column()
  role: string;

  @Column()
  status: string;

  @Column()
  balance: number;

  @Column()
  @OneToOne(() => Team)
  team_id: string | null;

  @Column({ type: 'jsonb' })
  stats: {
    shots_on_goal: number;
  };
}
