import { Person } from '../../person/models/person.entity';
import { ChildEntity, Column, JoinColumn, JoinTable, ManyToOne } from 'typeorm';
import { Team } from '../../team/models/team.entity';
import validObject from '../../utils/validObject';
import { InitializeMemberDto, PatchMemberDto } from '../member.dto';

export const NEW_MEMBER_INITIAL_FEE = 10;

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

  constructor(config?: InitializeMemberDto) {
    super(config);
    this.seedMember(config);
  }

  /**
   * @description Sets object data
   *
   * @param {InitializeMemberDto} config Data to be seeded
   * @returns {string}
   */
  private seedMember(config?: InitializeMemberDto): string {
    this.seedPerson(config);
    if (!validObject(config) || Object.keys(config).length === 0) return;

    ['balance', 'team_id', 'stats'].forEach((e) =>
      config[e] == null ? null : (this[e] = config[e]),
    );
    return 'Done';
  }

  /**
   * @description Updates object data
   *
   * @param {PatchMemberDto} config Update data
   * @returns {string}
   */
  public update(config?: PatchMemberDto): string {
    if (!validObject(config) || Object.keys(config).length === 0) return;

    // Make sure constant fields are not updated
    const temp = config;
    ['id'].map((k) => temp[k] && delete temp[k]);

    this.seedMember(temp);
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
