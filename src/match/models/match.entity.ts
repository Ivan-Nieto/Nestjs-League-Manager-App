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
import { InitializeMatchDto, PatchMatchDto } from '../match.dto';

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

  @Column({ enum: location, type: 'enum', default: 'unknown' })
  location: location;

  @Column({ type: 'uuid' })
  @ManyToOne(() => Staff)
  @JoinColumn({ name: 'referee' })
  referee: string;

  constructor(config?: InitializeMatchDto) {
    this.seedMatch(config);
  }

  /**
   * @description Sets object data
   *
   * @param {InitializeMatchDto} config Data to be seeded
   * @returns {string}
   */
  private seedMatch(config?: InitializeMatchDto): string {
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
    return 'Done';
  }

  /**
   * @description Updates object data
   *
   * @param {PatchMatchDto} config Update data
   * @returns {string}
   */
  public update(config?: PatchMatchDto): string {
    if (!validObject(config) || Object.keys(config).length === 0) return;

    // Make sure constant fields are not updated
    const temp: Record<string, any> = config || {};
    ['id'].map((k) => temp[k] && delete temp[k]);

    this.seedMatch(temp);
    return 'Done';
  }

  /**
   * @description Object representation of entity
   *
   * @returns {Object} All keys currently defined in this object
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
