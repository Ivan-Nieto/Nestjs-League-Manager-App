import { BadRequestException, ValidationPipe } from '@nestjs/common';
import validObject from 'src/utils/validObject';
import validateEntity from '../../utils/validateEntity';
import { PatchTeamDto } from '../team.dto';

export class PatchTeamValidationPipe extends ValidationPipe {
  async transform(value: any) {
    if (!validObject(value) || Object.keys(value).length === 0)
      throw new BadRequestException('Invalid request body');

    const team = new PatchTeamDto(value);
    const { valid, message } = await validateEntity(team);
    if (!valid) throw new BadRequestException(`Invalid parameters: ${message}`);

    return team;
  }
}
