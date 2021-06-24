import {
  BadRequestException,
  Injectable,
  ValidationPipe,
} from '@nestjs/common';
import validateEntity from '../../utils/validateEntity';
import { TeamIdDto } from '../team.dto';

@Injectable()
export class TeamIdValidationPipe extends ValidationPipe {
  async transform(value: any) {
    const team = new TeamIdDto({ id: value });

    const { valid } = await validateEntity(team);
    if (!valid) throw new BadRequestException('Invalid team id');

    return value;
  }
}
