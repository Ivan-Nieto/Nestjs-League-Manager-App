import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Staff } from '../../staff/models/staff.entity';
import { Team } from '../../team/models/team.entity';
import { location } from '../../utils/enums';
import validObject from '../../utils/validObject';

@Entity()
export class Match {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  @ManyToOne(() => Team)
  @JoinColumn({ name: 'home' })
  home: string;

  @Column({ type: 'uuid' })
  @ManyToOne(() => Team)
  @JoinColumn({ name: 'team' })
  team: string;

  @Column()
  'home-score': number;

  @Column()
  'away-score': number;

  @Column()
  played: Date;

  @Column({ enum: location, type: 'enum' })
  location: location;

  @Column({ type: 'uuid' })
  @ManyToOne(() => Staff)
  @JoinColumn({ name: 'referee' })
  referee: string;

  constructor(config?: {
    id?: string;
    home?: string;
    team?: string;
    'home-score'?: number;
    'away-score'?: number;
    played?: Date;
    location?: location;
    referee?: string;
  }) {
    if (!validObject(config) || Object.keys(config).length === 0) return;

    [
      'id',
      'home',
      'team',
      'home-score',
      'away-score',
      'played',
      'location',
      'referee',
    ].forEach((e) => (config[e] == null ? null : (this[e] = config[e])));
  }

  /**
   * @description Object representation of entity
   */
  public toObject(): Record<keyof this, any> {
    return Object.keys(this).reduce(
      (prev, curr) => ({
        ...prev,
        [curr]: this[curr],
      }),
      {} as any,
    );
  }
}
