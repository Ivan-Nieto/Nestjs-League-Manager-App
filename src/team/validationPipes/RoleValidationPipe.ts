import { BadRequestException, ValidationPipe } from '@nestjs/common';
import validateEntity from 'src/utils/validateEntity';
import { Member } from '../../member/models/member.entity';

export class RoleValidationPipe extends ValidationPipe {
  async transform(value: any) {
    if (!value) return value;

    const member = new Member({ role: value });

    const { valid } = await validateEntity(member);
    if (!valid) throw new BadRequestException('Invalid role');

    return value;
  }
}
