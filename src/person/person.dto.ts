import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsEmail,
  MinLength,
  IsNotEmpty,
  IsUUID,
  IsInt,
  IsDateString,
} from 'class-validator';
import { PartialType, PickType, OmitType } from '@nestjs/swagger';
import validObject from 'src/utils/validObject';

export class PersonDto {
  @IsUUID()
  id: string;

  @IsString()
  @MinLength(3)
  name: string;

  @IsString()
  @MinLength(3)
  last_name: string;

  @IsOptional()
  @IsInt()
  @ApiProperty({ type: 'number', example: 1230003131, minLength: 10 })
  phone?: number;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsNotEmpty()
  @IsDateString()
  @IsOptional()
  dob: Date;

  @IsOptional()
  @IsString()
  role: string;

  @IsOptional()
  @IsString()
  status?: string;

  constructor(config?: {
    id?: string;
    name?: string;
    last_name?: string;
    phone?: number;
    email?: string;
    dob?: string;
    role?: string;
    status?: string;
  }) {
    if (!config || Object.keys(config).length === 0) return;
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
  }
}

export class PersonIdDto extends PickType(PersonDto, ['id']) {
  constructor(config?: { id: string }) {
    super(config);
    this.id = config?.id;
  }
}

export class CreatePersonDto extends OmitType(PersonDto, ['id']) {
  constructor(config?: Record<keyof PersonDto, any>) {
    super(config);
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
}

export class UpdatePersonDto extends PartialType(CreatePersonDto) {
  constructor(config?: Record<keyof PersonDto, any>) {
    super(config);
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
}

export class UpdatePersonStatusDto extends PickType(CreatePersonDto, [
  'status',
]) {
  constructor(config?: { status: string }) {
    super();
    this.status = config?.status;
  }
}

export class UpdatePersonRoleDto extends PickType(CreatePersonDto, ['role']) {
  constructor(config?: { role: string }) {
    super();
    this.role = config?.role;
  }
}
