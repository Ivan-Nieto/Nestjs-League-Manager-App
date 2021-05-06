import {
  BadRequestException,
  Injectable,
  ValidationPipe,
} from '@nestjs/common';
import { Team } from '../models/team.entity';
import validateEntity from 'src/utils/validateEntity';

@Injectable()
export class TeamIdValidationPipe extends ValidationPipe {
  async transform(value: any) {
    const team = new Team({ id: value });

    const { valid } = await validateEntity(team);
    if (!valid) throw new BadRequestException('Invalid team id');

    return value;
  }
}
