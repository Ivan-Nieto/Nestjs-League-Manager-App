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
  id: string;

  @IsString()
  @MinLength(3)
  name: string;

  @IsString()
  @MinLength(3)
  last_name: string;

  @IsPhoneNumber()
  @IsOptional()
  phone: number;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsNotEmpty()
  @IsOptional()
  dob: string;

  @IsInt()
  @Min(0)
  @IsOptional()
  age: number;
}
