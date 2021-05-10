import {
  Injectable,
  BadRequestException,
  ValidationPipe,
} from '@nestjs/common';
import { CreateMatchDto } from '../match.dto';
import validObject from '../../utils/validObject';
import validateEntity from 'src/utils/validateEntity';

@Injectable()
export class CreateMatchValidationPipe extends ValidationPipe {
  async transform(value: any) {
    if (!validObject(value))
      throw new BadRequestException('Invalid request body');

    const match = new CreateMatchDto(value);

    const { valid, message } = await validateEntity(match);
    if (!valid) new BadRequestException(`Invalid parameters: ${message}`);

    return match;
  }
}
