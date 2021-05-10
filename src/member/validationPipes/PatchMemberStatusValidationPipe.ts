import { BadRequestException, ValidationPipe } from '@nestjs/common';
import validObject from '../../utils/validObject';
import { UpdatePersonStatusDto } from '../../person/person.dto';
import validateEntity from 'src/utils/validateEntity';

export class PatchMemberStatusValidationPipe extends ValidationPipe {
  async transform(value: any) {
    if (!validObject(value))
      throw new BadRequestException('Invalid request body');

    const member = new UpdatePersonStatusDto(value.status);

    const { valid } = await validateEntity(member);
    if (!valid) throw new BadRequestException('Invalid status');

    return { status: value.status };
  }
}
