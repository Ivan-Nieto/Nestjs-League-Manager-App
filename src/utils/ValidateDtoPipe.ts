import { BadRequestException, ValidationPipe } from '@nestjs/common';
import validateEntity from './validateEntity';

export class ValidateDtoPipe extends ValidationPipe {
  private dto: any;

  constructor(dto: any) {
    super();
    this.dto = dto;
  }

  async transform(value: any) {
    const obj = new this.dto(value);

    const { valid, message } = await validateEntity(obj);
    if (!valid) throw new BadRequestException(`Invalid parameters: ${message}`);

    return obj;
  }
}

export class ValidateDtoValuePipe extends ValidationPipe {
  private dto: any;
  private field: string;
  private optional: boolean;

  constructor(dto: any, field: string, optional?: boolean) {
    super();
    this.dto = dto;
    this.field = field;
    this.optional = Boolean(optional);
  }

  async transform(value: any) {
    const obj = new this.dto({ [this.field]: value });

    if (this.optional && value == null) return;

    const { valid } = await validateEntity(obj);
    if (!valid)
      throw new BadRequestException(`Missing or invalid ${this.field}`);

    return obj[this.field];
  }
}
