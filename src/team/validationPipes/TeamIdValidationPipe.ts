import {
  BadRequestException,
  Injectable,
  ValidationPipe,
} from '@nestjs/common';
import { Team } from '../models/team.entity';
import { validate } from 'class-validator';

@Injectable()
export class TeamIdValidationPipe extends ValidationPipe {
  async transform(value: any) {
    const team = new Team();
    team.id = value.id;

    await validate(team, { skipMissingProperties: true })
      .then((errors) => {
        if (errors.length) throw new BadRequestException('Invalid team id');
      })
      .catch((error) => {
        console.error(error);
        throw new BadRequestException('Invalid team id');
      });

    return value;
  }
}
