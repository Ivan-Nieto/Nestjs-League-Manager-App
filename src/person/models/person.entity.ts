import { IsOptional, Min } from 'class-validator';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Person {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  last_name: string;

  @Column()
  phone: number;

  @Column()
  email: string;

  @Column()
  @IsOptional()
  dob: Date;

  @Column()
  @Min(0)
  @IsOptional()
  age: number;

  constructor(config?: {
    id?: string;
    name?: string;
    last_name?: string;
    phone?: number;
    email?: string;
    dob?: Date;
    age?: number;
  }) {
    if (!config || Object.keys(config).length === 0) return;

    ['id', 'name', 'last_name', 'phone', 'email', 'dob', 'age'].forEach((e) =>
      config[e] == null ? null : (this[e] = config[e]),
    );
  }
}
