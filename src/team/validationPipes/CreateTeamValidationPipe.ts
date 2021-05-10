import {
  BadRequestException,
  Injectable,
  ValidationPipe,
} from '@nestjs/common';
import { CreateTeamDto } from '../team.dto';
import validObject from 'src/utils/validObject';
import validateEntity from 'src/utils/validateEntity';

@Injectable()
export class CreateTeamValidationPipe extends ValidationPipe {
  async transform(value: any) {
    if (!validObject(value) || Object.keys(value).length === 0)
      throw new BadRequestException('Invalid request body');

    const team = new CreateTeamDto(value);

    const { valid, message } = await validateEntity(team);
    if (!valid) throw new BadRequestException(`Invalid parameters: ${message}`);

    return team;
  }
}
