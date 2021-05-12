import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import validObject from '../../utils/validObject';
import { Member } from '../../member/models/member.entity';
import { teamStatus } from '../../utils/enums';
import { InitializeTeamDto, PatchTeamDto } from '../team.dto';

@Entity()
export class Team {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'uuid' })
  @OneToOne(() => Member)
  @JoinColumn({ name: 'coach' })
  coach: string;

  @Column({ type: 'uuid', nullable: true })
  @OneToOne(() => Member)
  @JoinColumn({ name: 'captain' })
  captain: string | null;

  @Column({ enum: teamStatus, type: 'enum', default: 'unknown' })
  status: teamStatus;

  constructor(config?: InitializeTeamDto) {
    this.seedTeam(config);
  }

  /**
   * @description Sets object data
   *
   * @param {InitializeTeamDto} config Data to be seeded
   * @returns {string}
   */
  private seedTeam(config?: InitializeTeamDto): string {
    if (!validObject(config) || Object.keys(config).length === 0) return;

    ['id', 'name', 'coach', 'captain', 'status'].forEach((e) =>
      config[e] == null ? null : (this[e] = config[e]),
    );
    return 'Done';
  }

  /**
   * @description Updates object data
   *
   * @param {PatchTeamDto} config Update data
   * @returns {string}
   */
  public update(config?: PatchTeamDto): string {
    if (!validObject(config) || Object.keys(config).length === 0) return;

    // Make sure constant fields are not updated
    const temp = config;
    ['id'].map((k) => temp[k] && delete temp[k]);

    this.seedTeam(temp);
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
