import validObject from '../../utils/validObject';
import {
  TableInheritance,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { status } from '../../utils/enums';

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class Person {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  last_name: string;

  @Column({ type: 'bigint', nullable: true })
  phone?: number | null;

  @Column({ nullable: true })
  email?: string | null;

  @Column()
  dob: Date;

  @Column()
  role: string;

  @Column({ enum: status, type: 'enum' })
  status: status;

  constructor(config?: {
    name?: string;
    last_name?: string;
    phone?: number;
    email?: string;
    dob?: Date;
    role?: string;
    status?: status;
  }) {
    if (!validObject(config) || Object.keys(config).length === 0) return;

    [
      'name',
      'last_name',
      'phone',
      'email',
      'dob',
      'role',
      'status',
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
