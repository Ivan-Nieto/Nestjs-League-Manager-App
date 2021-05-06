import { BadRequestException, ValidationPipe } from '@nestjs/common';
import validateEntity from 'src/utils/validateEntity';
import validObject from 'src/utils/validObject';
import { Match } from '../models/match.entity';

export class PatchMatchValidationPipe extends ValidationPipe {
  async transform(value: any) {
    if (!validObject(value) || Object.keys(value).length === 0)
      throw new BadRequestException('Invalid request body');

    const temp = value;
    if (temp.id) delete temp.id;
    const match = new Match(temp);

    const { valid, message } = await validateEntity(match);
    if (!valid) throw new BadRequestException(`Invalid parameters: ${message}`);

    return temp;
  }
}
