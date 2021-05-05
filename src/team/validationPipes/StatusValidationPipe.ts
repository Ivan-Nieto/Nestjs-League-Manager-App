import { BadRequestException, ValidationPipe } from '@nestjs/common';
import validateEntity from 'src/utils/validateEntity';
import { Team } from '../models/team.entity';

export class StatusValidationPipe extends ValidationPipe {
  async transform(value: any) {
    if (!value) return value;

    const team = new Team({ status: value });

    const { valid } = await validateEntity(team);
    if (!valid) throw new BadRequestException('Invalid status');

    return value;
  }
}
