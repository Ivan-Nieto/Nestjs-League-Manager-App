import { IsDate, IsNotEmpty, IsString, IsUUID, Min } from 'class-validator';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Team } from '../../team/models/team.entity';

@Entity()
export class Match {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  id: string;

  @Column({ type: 'uuid' })
  @IsNotEmpty()
  @IsUUID()
  @OneToOne(() => Team)
  home: string;

  @Column({ type: 'uuid' })
  @IsNotEmpty()
  @IsUUID()
  @OneToOne(() => Team)
  team: string;

  @Column()
  @IsNotEmpty()
  @Min(0)
  'home-score': number;

  @Column()
  @IsNotEmpty()
  @Min(0)
  'away-score': number;

  @Column()
  @IsDate()
  played: Date;

  @Column()
  @IsString()
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
