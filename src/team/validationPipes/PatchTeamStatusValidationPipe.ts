import { BadRequestException, ValidationPipe } from '@nestjs/common';
import validateEntity from 'src/utils/validateEntity';
import validObject from 'src/utils/validObject';
import { Team } from '../models/team.entity';

export class PatchTeamStatusValidationPipe extends ValidationPipe {
  async transform(value: any) {
    if (!validObject(value) || Object.keys(value).length === 0)
      throw new BadRequestException('Invalid request body');

    const team = new Team({ status: value.status });
    const { valid } = await validateEntity(team);
    if (!valid)
      throw new BadRequestException(
        'Invalid or missing status in request body',
      );

    return value.status;
  }
}
