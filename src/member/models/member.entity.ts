import { Person } from '../../person/models/person.entity';
import {
  ChildEntity,
  Column,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { Team } from '../../team/models/team.entity';
import validObject from '../../utils/validObject';

@ChildEntity()
export class Member extends Person {
  @Column()
  balance: number;

  @Column({ type: 'uuid' })
  @JoinTable()
  @ManyToOne(() => Team)
  @JoinColumn({ name: 'team_id' })
  team_id: string | null;

  @Column({ type: 'jsonb' })
  stats: {
    shots_on_goal?: number;
    [key: string]: any;
  };

  constructor(config?: Record<string, any>) {
    super(config);
    if (!validObject(config) || Object.keys(config).length === 0) return;

    ['balance', 'team_id', 'stats'].forEach((e) =>
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
