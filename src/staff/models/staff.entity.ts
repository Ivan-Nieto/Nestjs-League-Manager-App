import validObject from '../../utils/validObject';
import { ChildEntity, Column } from 'typeorm';
import { Person } from '../../person/models/person.entity';
import { InitializeStaffDto, UpdateStaffDto } from '../staff.dto';

@ChildEntity()
export class Staff extends Person {
  @Column()
  wage?: number | null;

  @Column()
  hire_date?: Date | null;

  constructor(config?: InitializeStaffDto) {
    super(config);
    this.seedStaff(config);
  }

  /**
   * @description Sets object data
   *
   * @param {InitializeStaffDto} config Data to be seeded
   * @returns {string}
   */
  private seedStaff(config?: InitializeStaffDto): string {
    this.seedPerson(config);
    if (!validObject(config) || Object.keys(config).length === 0) return;

    this.wage = config?.wage;
    this.hire_date = config?.hire_date;
    return 'Done';
  }

  /**
   * @description Updates object data
   *
   * @param {UpdatePersonDto} config Update data
   * @returns {string}
   */
  public update(config?: UpdateStaffDto): string {
    if (!validObject(config) || Object.keys(config).length === 0) return;

    // Make sure constant fields are not updated
    const temp = config;
    ['id'].map((k) => temp[k] && delete temp[k]);

    this.seedStaff(temp);
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
