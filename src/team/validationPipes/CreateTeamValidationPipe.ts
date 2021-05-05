import {
  BadRequestException,
  Injectable,
  ValidationPipe,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Team } from '../models/team.entity';
import { validate } from 'class-validator';

@Injectable()
export class CreateTeamValidationPipe extends ValidationPipe {
  async transform(value: any) {
    const team = new Team();
    team.id = uuidv4();
    team.captain = value.captain;
    team.coach = value.coach;
    team.name = value.name;
    team.status = value.status;

    const Error = (arr?: Array<any>) =>
      new BadRequestException(
        `Invalid parameters${arr ? ` :${arr?.join(', ')}` : ''}`,
      );

    await validate(team)
      .then((errors) => {
        if (errors.length) throw Error(errors);
      })
      .catch((error) => {
        console.error(error);
        throw Error();
      });

    return { ...value, id: uuidv4() };
  }
}
