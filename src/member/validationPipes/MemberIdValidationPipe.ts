import {
  BadRequestException,
  Injectable,
  ValidationPipe,
} from '@nestjs/common';
import validateEntity from 'src/utils/validateEntity';
import { MemberIdDto } from '../member.dto';

/**
 * @description Makes sure a member with the provided id exists
 */
@Injectable()
export class MemberIdValidationPipe extends ValidationPipe {
  async transform(value: any) {
    const member = new MemberIdDto(value);

    const { valid } = await validateEntity(member);
    if (!valid) throw new BadRequestException('Invalid member uuid');

    return member;
  }
}
