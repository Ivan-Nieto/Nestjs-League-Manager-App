import { IsNotEmpty, Min } from 'class-validator';
import { Column, Entity, OneToOne, PrimaryColumn } from 'typeorm';
import { Team } from '../../team/models/team.entity';

@Entity()
export class Match {
  @PrimaryColumn()
  id: string;

  @Column()
  @IsNotEmpty()
  @OneToOne(() => Team)
  home: string;

  @Column()
  @IsNotEmpty()
  @OneToOne(() => Team)
  team: string;

  @Column()
  @Min(0)
  'home-score': number;

  @Column()
  @Min(0)
  'away-score': number;

  @Column()
  played: Date;

  @Column()
  location: 'active' | 'inactive';

  constructor(config?: {
    id?: string;
    home?: string;
    team?: string;
    'home-score'?: number;
    'away-score'?: number;
    played?: Date;
    location?: 'active' | 'inactive';
  }) {
    if (!config || Object.keys(config).length === 0) return;

    [
      'id',
      'home',
      'team',
      'home-score',
      'away-score',
      'played',
      'location',
    ].forEach((e) => (config[e] == null ? null : (this[e] = config[e])));
  }
}
