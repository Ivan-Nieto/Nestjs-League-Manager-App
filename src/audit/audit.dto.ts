import { PartialType, PickType } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmptyObject,
  IsString,
  IsUUID,
} from 'class-validator';
import { entities, actions } from '../utils/enums';

export class AuditDto {
  @IsUUID()
  id: string;

  @IsString()
  entity: entities;

  @IsString()
  action: actions;

  @IsNotEmptyObject()
  new_value: Record<string, any>;

  @IsDateString()
  modified_at: string;
}

export class InitializeAuditDto extends PartialType(AuditDto) {}
export class AuditIdDto extends PickType(AuditDto, ['id']) {
  constructor(id: string) {
    super();
    this.id = id;
  }
}
