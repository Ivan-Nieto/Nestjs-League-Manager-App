import validObject from '../../utils/validObject';
import {
  TableInheritance,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { status } from '../../utils/enums';
import { InitializePersonDto, UpdatePersonDto } from '../person.dto';

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

  @Column({ enum: status, type: 'enum', default: 'unknown' })
  status: status;

  constructor(config?: InitializePersonDto) {
    this.seedPerson(config);
  }

  /**
   * @description Sets object data
   *
   * @param {InitializePersonDto} config Data to be seeded
   * @returns {string}
   */
  public seedPerson(config?: InitializePersonDto): string {
    if (!validObject(config) || Object.keys(config).length === 0) return;

    [
      'id',
      'name',
      'last_name',
      'phone',
      'email',
      'dob',
      'role',
      'status',
    ].forEach((e) => (config[e] == null ? null : (this[e] = config[e])));
    return 'Done';
  }

  /**
   * @description Updates object data
   *
   * @param {UpdatePersonDto} config Update data
   * @returns {string}
   */
  public update(config?: UpdatePersonDto): string {
    if (!validObject(config) || Object.keys(config).length === 0) return;

    // Make sure constant fields are not updated
    const temp: any = config || {};
    ['id'].map((k) => temp[k] && delete temp[k]);

    this.seedPerson(temp);
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
