import { IsDate, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import validObject from '../../utils/validObject';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Audit {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  id: string;

  @Column()
  @IsString()
  entity: 'match' | 'member' | 'person' | 'team' | 'staff';

  @Column()
  @IsString()
  action: 'add' | 'delete' | 'update';

  @Column()
  @IsDate()
  modified_at: Date;

  @Column({ type: 'jsonb' })
  @IsNotEmpty()
  new_value: Record<string, any>;

  constructor(config?: {
    entity?: any;
    action?: any;
    modified_at?: any;
    new_value?: any;
  }) {
    if (!validObject(config) || Object.keys(config).length === 0) return;
    ['entity', 'action', 'modified_at', 'new_value'].forEach((e) =>
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
