import {
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';
import {
  TableInheritance,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class Person {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  id: string;

  @Column()
  @IsString()
  name: string;

  @Column()
  @IsString()
  last_name: string;

  @Column({ type: 'bigint' })
  @IsPhoneNumber()
  @IsOptional()
  phone?: number | null;

  @Column()
  @IsEmail()
  @IsOptional()
  email?: string | null;

  @Column()
  @IsOptional()
  dob?: Date | null;

  @Column()
  @IsString()
  role: string;

  @Column()
  @IsString()
  status: string;

  @Column()
  @Min(0)
  @IsOptional()
  age?: number | null;

  constructor(config?: {
    name?: string;
    last_name?: string;
    phone?: number;
    email?: string;
    dob?: Date;
    role?: string;
    status?: string;
    age?: number;
  }) {
    if (!config || Object.keys(config).length === 0) return;

    [
      'name',
      'last_name',
      'phone',
      'email',
      'dob',
      'role',
      'status',
      'age',
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
