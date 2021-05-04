import { BadRequestException, ValidationPipe } from '@nestjs/common';
import validObject from '../../utils/validObject';
import { MemberDto } from '../member.dto';
import { validate } from 'class-validator';

export class PatchMemberStatusValidationPipe extends ValidationPipe {
  async transform(value: any) {
    if (!validObject(value))
      throw new BadRequestException('Invalid request body');

    const member = new MemberDto();
    member.status = value.status;

    await validate(member, {
      skipMissingProperties: true,
      forbidUnknownValues: true,
    })
      .then((errors) => {
        if (errors.length) throw new BadRequestException('Invalid status');
      })
      .catch((error) => {
        console.error(error);
        throw new BadRequestException('Invalid status');
      });

    return value.status;
  }
}
