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
}
