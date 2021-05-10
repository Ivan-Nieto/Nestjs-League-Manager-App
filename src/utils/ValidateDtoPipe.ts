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
