import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Person } from '../../person/models/person.entity';
import { ChildEntity, Column, JoinTable, OneToOne } from 'typeorm';
import { Team } from '../../team/models/team.entity';

@ChildEntity()
export class Member extends Person {
  @Column()
  @IsNumber()
  balance: number;

  @Column({ type: 'uuid' })
  @IsString()
  @JoinTable()
  @OneToOne(() => Team)
  team_id: string | null;

  @Column({ type: 'jsonb' })
  @IsNotEmpty()
  stats: {
    shots_on_goal?: number;
    [key: string]: any;
  };

  constructor(config?: Record<string, any>) {
    super(config);
    if (!config || Object.keys(config).length === 0) return;

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
