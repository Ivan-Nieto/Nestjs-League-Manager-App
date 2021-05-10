import {
  Injectable,
  BadRequestException,
  ValidationPipe,
} from '@nestjs/common';
import validateEntity from 'src/utils/validateEntity';
import { MatchIdDto } from '../match.dto';

@Injectable()
export class MatchIdValidationPipe extends ValidationPipe {
  async transform(value: any) {
    const match = new MatchIdDto({ id: value });

    await validateEntity(match).then(({ valid }) => {
      if (!valid) throw new BadRequestException(`Invalid match id`);
    });

    return match.id;
  }
}
