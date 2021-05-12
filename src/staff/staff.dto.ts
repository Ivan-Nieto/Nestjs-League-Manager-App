import { IsDateString, IsNumber, IsOptional, Min } from 'class-validator';
import {
  PersonDto,
  UpdatePersonDto,
  CreatePersonDto,
} from '../person/person.dto';
import validObject from '../utils/validObject';
import { PartialType, PickType } from '@nestjs/swagger';

export class StaffDto extends PersonDto {
  @IsNumber()
  @Min(0)
  @IsOptional()
  wage?: number;

  @IsDateString()
  @IsOptional()
  hire_date?: Date;
}

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

export class InitializeStaffDto extends PartialType(StaffDto) {}

export class StaffIdDto extends PickType(PersonDto, ['id']) {
  constructor(config?: { id?: string }) {
    super();
    if (!validObject(config) || Object.keys(config).length === 0) return;
    this.id = config?.id;
  }
}
