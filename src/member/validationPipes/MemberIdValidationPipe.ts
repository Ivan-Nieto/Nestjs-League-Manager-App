import {
  BadRequestException,
  Injectable,
  ValidationPipe,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { MemberDto } from '../member.dto';

/**
 * @description Makes sure a member with the provided id exists
 */
@Injectable()
export class MemberIdValidationPipe extends ValidationPipe {
  async transform(value: any) {
    const member = new MemberDto();
    member.id = value || '';

    await validate(member, {
      forbidUnknownValues: true,
      skipMissingProperties: true, // Ignore all other required fields other than id
    })
      .then((errors) => {
        if (errors.length) throw new BadRequestException('Invalid member uuid');
      })
      .catch((error) => {
        console.error(error);
        throw new BadRequestException('Invalid member uuid');
      });

    return value;
  }
}
