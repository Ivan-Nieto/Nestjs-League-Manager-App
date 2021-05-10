import { BadRequestException, ValidationPipe } from '@nestjs/common';
import validateEntity from 'src/utils/validateEntity';
import validObject from 'src/utils/validObject';
import { PatchMatchDto } from '../match.dto';

export class PatchMatchValidationPipe extends ValidationPipe {
  async transform(value: any) {
    if (!validObject(value) || Object.keys(value).length === 0)
      throw new BadRequestException('Invalid request body');

    const match = new PatchMatchDto(value);

    const { valid, message } = await validateEntity(match);
    if (!valid) throw new BadRequestException(`Invalid parameters: ${message}`);

    return match;
  }
}
