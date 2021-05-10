import { IsDateString, IsNumber, IsOptional, Min } from 'class-validator';
import {
  PersonDto,
  CreatePersonDto,
  UpdatePersonDto,
} from '../person/person.dto';
import validObject from 'src/utils/validObject';

export class CreateStaffDto extends CreatePersonDto {
  @IsNumber()
  @Min(0)
  @IsOptional()
  wage?: number;

  @IsDateString()
  @IsOptional()
  hire_date?: Date;

  constructor(config?: Record<string, any>) {
    super(config);
    if (!validObject(config) || Object.keys(config).length === 0) return;

    this.wage = config?.wage;
    this.hire_date = config?.hire_date;
  }
}

export class UpdateStaffDto extends UpdatePersonDto {
  @IsNumber()
  @IsOptional()
  @Min(0)
  wage?: number;

  @IsDateString()
  @IsOptional()
  hire_date?: Date;

  constructor(config?: Record<string, any>) {
    super(config);
    if (!validObject(config) || Object.keys(config).length === 0) return;

    this.wage = config?.wage;
    this.hire_date = config?.hire_date;
  }
}

export class StaffIdDto extends PersonDto {
  constructor(config?: { id?: string }) {
    super();
    if (!validObject(config) || Object.keys(config).length === 0) return;
    this.id = config?.id;
  }
}
