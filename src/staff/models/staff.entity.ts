import { IsDate, IsNumber, IsOptional, Min } from 'class-validator';
import validObject from '../../utils/validObject';
import { ChildEntity, Column } from 'typeorm';
import { Person } from '../../person/models/person.entity';

@ChildEntity()
export class Staff extends Person {
  @Column()
  @IsNumber()
  @IsOptional()
  @Min(0)
  wage?: number | null;

  @Column()
  @IsDate()
  @IsOptional()
  hire_date?: Date | null;

  constructor(config: Record<string, any>) {
    super(config);

    if (!validObject(config) || Object.keys(config).length === 0) return;

    this.wage = config?.wage;
    this.hire_date = config?.hire_date;
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
