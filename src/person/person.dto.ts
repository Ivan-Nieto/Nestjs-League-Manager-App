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
  IsEnum,
  ValidateIf,
} from 'class-validator';
import { PartialType, PickType, OmitType } from '@nestjs/swagger';
import validObject from '../utils/validObject';
import { status } from '../utils/enums';
import PhoneNumber from '../utils/PhoneNumberValidator';

export class PersonDto {
  @IsUUID()
  id: string;

  @IsString()
  @MinLength(3)
  @ApiProperty({ example: 'Douglass' })
  name: string;

  @IsString()
  @MinLength(3)
  @ApiProperty({ example: 'Mc Murray' })
  last_name: string;

  @ValidateIf(
    (o) => (!Boolean(o.email) && !Boolean(o.phone)) || Boolean(o.phone),
  )
  @IsInt()
  @PhoneNumber()
  @ApiProperty({ type: 'number', example: 5759939983, minLength: 10 })
  phone?: number;

  @ValidateIf(
    (o) => (!Boolean(o.email) && !Boolean(o.phone)) || Boolean(o.email),
  )
  @IsEmail()
  @ApiProperty({ example: 'd.mcmurray@test.com' })
  email?: string;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({ example: '2000-11-24' })
  dob: Date;

  @IsString()
  @ApiProperty({ example: 'player' })
  role: string;

  @IsOptional()
  @IsString()
  @IsEnum(status)
  @ApiProperty({ example: 'injured', type: 'enum', enum: status })
  status?: status;

  constructor(config?: {
    id?: string;
    name?: string;
    last_name?: string;
    phone?: number;
    email?: string;
    dob?: string;
    role?: string;
    status?: status;
  }) {
    if (!config || Object.keys(config).length === 0) return;
    this.seedPerson(config);
  }

  public seedPerson(config?: {
    id?: string;
    name?: string;
    last_name?: string;
    phone?: number;
    email?: string;
    dob?: string;
    role?: string;
    status?: status;
  }) {
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

export class InitializePersonDto extends PartialType(PersonDto) {}
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
  constructor(config?: { status: status }) {
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
