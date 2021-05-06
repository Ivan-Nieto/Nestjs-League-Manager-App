import {
  Injectable,
  BadRequestException,
  ValidationPipe,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Match } from '../models/match.entity';
import validObject from '../../utils/validObject';
import validateEntity from 'src/utils/validateEntity';

@Injectable()
export class CreateMatchValidationPipe extends ValidationPipe {
  async transform(value: any) {
    if (!validObject(value))
      throw new BadRequestException('Invalid request body');

    const match = new Match();
    match.id = uuidv4();
    const addData = (field: string) =>
      value[field] == null ? null : (match[field] = value[field]);

    [
      'home',
      'team',
      'home-score',
      'away-score',
      'played',
      'location',
    ].forEach((e) => addData(e));

    const { valid, message } = await validateEntity(match);
    if (!valid) new BadRequestException(`Invalid parameters: ${message}`);

    return { ...value, id: match.id };
  }
}
