import {
  BadRequestException,
  Injectable,
  ValidationPipe,
} from '@nestjs/common';
import validateEntity from 'src/utils/validateEntity';
import { PostMemberDto } from '../member.dto';

@Injectable()
export class CreateMemberValidationPipe extends ValidationPipe {
  async transform(value: any) {
    const member = new PostMemberDto(value);

    const { valid, message } = await validateEntity(member);
    if (!valid) throw new BadRequestException(`Invalid parameters: ${message}`);

    // Default some values if not provided
    return {
      stats: {},
      balance: 0,
      ...member,
    };
  }
}
