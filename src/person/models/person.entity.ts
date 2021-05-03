import { Min } from 'class-validator';
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
  dob: string;

  @Column()
  @Min(0)
  age: number;
}
