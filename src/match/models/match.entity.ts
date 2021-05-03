import { Min } from 'class-validator';
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { Team } from '../../team/models/team.entity';

@Entity()
export class Match {
  @PrimaryColumn()
  id: string;

  @Column()
  @OneToOne(() => Team)
  @JoinColumn()
  home: string;

  @Column()
  @OneToOne(() => Team)
  @JoinColumn()
  team: string;

  @Column()
  @Min(0)
  home_score: number;

  @Column()
  @Min(0)
  away_score: number;

  @Column()
  payed: Date;

  @Column()
  location: 'active' | 'inactive';
}
