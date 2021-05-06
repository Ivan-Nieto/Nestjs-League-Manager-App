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

export class PersonDto {
  @IsUUID()
  @IsOptional()
  id?: string;

  @IsString()
  @MinLength(3)
  name: string;

  @IsString()
  @MinLength(3)
  last_name: string;

  @IsPhoneNumber()
  @IsOptional()
  phone?: number;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsNotEmpty()
  @IsOptional()
  dob?: string;

  @IsOptional()
  @IsString()
  role?: string;

  @IsOptional()
  @IsString()
  status?: string;

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
