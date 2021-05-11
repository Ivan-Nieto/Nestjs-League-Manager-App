import { PickType } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmptyObject,
  IsString,
  IsUUID,
} from 'class-validator';

export class AuditDto {
  @IsUUID()
  id: string;

  @IsString()
  entity: 'team' | 'match' | 'staff' | 'person';

  @IsString()
  action: 'add' | 'update' | 'delete';

  @IsNotEmptyObject()
  new_value: Record<string, any>;

  @IsDateString()
  modified_at: string;
}

export class AuditIdDto extends PickType(AuditDto, ['id']) {
  constructor(id: string) {
    super();
    this.id = id;
  }
}
