import { BadRequestException, ValidationPipe } from '@nestjs/common';
import validObject from '../../utils/validObject';
import { PatchMemberDto } from '../member.dto';
import validateEntity from 'src/utils/validateEntity';

export class UpdateMemberValidationPipe extends ValidationPipe {
  async transform(value: any) {
    if (!validObject(value) || Object.keys(value).length === 0)
      throw new BadRequestException('Invalid body');

    const member = new PatchMemberDto(value);
    const { valid, message } = await validateEntity(member);
    if (!valid) throw new BadRequestException(`Invalid parameters: ${message}`);

    return member;
  }
}
