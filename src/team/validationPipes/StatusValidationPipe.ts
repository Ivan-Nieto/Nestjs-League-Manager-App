import { BadRequestException, ValidationPipe } from '@nestjs/common';
import validateEntity from 'src/utils/validateEntity';
import { PatchStatusDto } from '../team.dto';

export class StatusValidationPipe extends ValidationPipe {
  async transform(value: any) {
    if (!value) return value;

    const team = new PatchStatusDto({ status: value });

    const { valid } = await validateEntity(team);
    if (!valid) throw new BadRequestException('Invalid status');

    return team.status;
  }
}
