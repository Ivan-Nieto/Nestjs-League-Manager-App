import validObject from '../../utils/validObject';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { entities, actions } from '../../utils/enums';
import { InitializeAuditDto } from '../audit.dto';

@Entity()
export class Audit {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: entities })
  entity: entities;

  @Column({ type: 'enum', enum: actions })
  action: actions;

  @Column()
  modified_at: Date;

  @Column({ type: 'jsonb' })
  new_value: Record<string, any>;

  constructor(config?: InitializeAuditDto) {
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
