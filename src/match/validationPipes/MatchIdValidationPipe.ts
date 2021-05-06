import {
  Injectable,
  BadRequestException,
  ValidationPipe,
} from '@nestjs/common';
import validateEntity from 'src/utils/validateEntity';
import { Match } from '../models/match.entity';

@Injectable()
export class MatchIdValidationPipe extends ValidationPipe {
  async transform(value: any) {
    const match = new Match({ id: value });

    await validateEntity(match).then(({ valid }) => {
      if (!valid) throw new BadRequestException(`Invalid match id`);
    });

    return value;
  }
}
