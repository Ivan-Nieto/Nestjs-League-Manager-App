import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import validObject from '../../utils/validObject';
import { Member } from '../../member/models/member.entity';
import { status } from '../../utils/enums';

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

  @Column()
  status: status;

  constructor(config?: {
    id?: string;
    name?: string;
    coach?: string;
    captain?: string | null;
    status?: status;
  }) {
    if (!validObject(config) || Object.keys(config).length === 0) return;

    ['id', 'name', 'coach', 'captain', 'status'].forEach((e) =>
      config[e] == null ? null : (this[e] = config[e]),
    );
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
