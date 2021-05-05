import { BadRequestException, ValidationPipe } from '@nestjs/common';
import validObject from 'src/utils/validObject';
import validateEntity from '../../utils/validateEntity';
import { Team } from '../models/team.entity';

export class PatchTeamValidationPipe extends ValidationPipe {
  async transform(value: any) {
    if (!validObject(value) || Object.keys(value).length === 0)
      throw new BadRequestException('Invalid request body');

    const temp = value;
    if (temp.id) delete temp.id;

    const team = new Team(temp);
    const { valid, message } = await validateEntity(team);
    if (!valid) throw new BadRequestException(`Invalid parameters: ${message}`);

    return temp;
  }
}
