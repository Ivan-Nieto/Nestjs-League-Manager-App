import {
  Min,
  IsString,
  IsOptional,
  IsNumber,
  IsNotEmpty,
} from 'class-validator';
import validObject from '../utils/validObject';
import { ApiProperty, PickType } from '@nestjs/swagger';

import {
  UpdatePersonDto,
  CreatePersonDto,
  PersonDto,
  InitializePersonDto,
} from '../person/person.dto';

export class MemberIdDto extends PickType(PersonDto, ['id']) {
  constructor(id: string) {
    super();
    this.id = id;
  }
}

export class PostMemberDto extends CreatePersonDto {
  @IsNumber()
  @Min(0)
  @IsOptional()
  balance?: number;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: '00000000-0000-4000-A000-000000000000' })
  team_id?: string | null;

  @IsNotEmpty()
  @IsOptional()
  stats?: {
    shots_on_goal?: number;
    [key: string]: any;
  };

  constructor(data: Record<string, any>) {
    super(data);
    if (!validObject(data)) return;
    ['balance', 'team_id', 'stats'].forEach((e) =>
      data[e] == null ? null : (this[e] = data[e]),
    );
  }
}

export class PatchMemberDto extends UpdatePersonDto {
  @IsNumber()
  @Min(0)
  @IsOptional()
  balance?: number;

  @IsString()
  @IsOptional()
  team_id?: string | null;

  @IsNotEmpty()
  @IsOptional()
  stats?: {
    shots_on_goal?: number;
    [key: string]: any;
  };

  constructor(data: Record<string, any>) {
    super(data);
    if (!validObject(data)) return;
    ['balance', 'team_id', 'stats'].forEach((e) =>
      data[e] == null ? null : (this[e] = data[e]),
    );
  }
}

export class InitializeMemberDto extends InitializePersonDto {
  @IsNumber()
  @Min(0)
  @IsOptional()
  balance?: number;

  @IsString()
  @IsOptional()
  team_id?: string | null;

  @IsNotEmpty()
  @IsOptional()
  stats?: {
    shots_on_goal?: number;
    [key: string]: any;
  };
}

export class PostPaymentDto {
  @IsNumber()
  @Min(0)
  amount: number;

  constructor(config?: { amount?: number }) {
    this.amount = config?.amount;
  }
}
