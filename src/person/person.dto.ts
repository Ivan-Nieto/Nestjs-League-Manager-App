import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  Min,
  IsString,
  IsOptional,
  IsEmail,
  MinLength,
  IsPhoneNumber,
  IsNotEmpty,
  IsUUID,
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

  @IsPhoneNumber()
  @IsOptional()
  @ApiProperty({ type: 'number', example: 1230003131, minLength: 10 })
  phone?: number;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsNotEmpty()
  @IsOptional()
  dob?: Date;

  @IsOptional()
  @IsString()
  role: string;

  @IsOptional()
  @IsString()
  status: string;

  @IsInt()
  @Min(0)
  @IsOptional()
  age?: number;

  constructor(config?: {
    id?: string;
    name?: string;
    last_name?: string;
    phone?: number;
    email?: string;
    dob?: string;
    role?: string;
    status?: string;
    age?: number;
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
      'age',
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
      'age',
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
      'age',
    ].forEach((e) => (config[e] == null ? null : (this[e] = config[e])));
  }
}

export class UpdatePersonStatusDto extends PickType(CreatePersonDto, [
  'status',
]) {
  constructor(config?: { status: string }) {
    super(config);
    this.status = config?.status;
  }
}

export class UpdatePersonRoleDto extends PickType(CreatePersonDto, ['role']) {
  constructor(config?: { role: string }) {
    super(config);
    this.role = config?.role;
  }
}
