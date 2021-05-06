import {
  BadRequestException,
  Injectable,
  ValidationPipe,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Team } from '../models/team.entity';
import validObject from 'src/utils/validObject';
import validateEntity from 'src/utils/validateEntity';

@Injectable()
export class CreateTeamValidationPipe extends ValidationPipe {
  async transform(value: any) {
    if (!validObject(value) || Object.keys(value).length === 0)
      throw new BadRequestException('Invalid request body');

    const team = new Team({
      id: uuidv4(),
      ...value,
    });

    const { valid, message } = await validateEntity(team);
    if (!valid) throw new BadRequestException(`Invalid parameters: ${message}`);

    return team.toObject();
  }
}
