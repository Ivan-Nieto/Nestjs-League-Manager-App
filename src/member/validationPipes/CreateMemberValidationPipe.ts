import {
  BadRequestException,
  Injectable,
  ValidationPipe,
} from '@nestjs/common';
import validateEntity from '../../utils/validateEntity';
import { PostMemberDto } from '../member.dto';

@Injectable()
export class CreateMemberValidationPipe extends ValidationPipe {
  async transform(value: any) {
    const member = new PostMemberDto(value);

    const { valid, message } = await validateEntity(member);
    if (!valid) throw new BadRequestException(`Invalid parameters: ${message}`);

    // Make sure staff member is over 18
    const date = new Date(value.dob);
    const threshold = new Date();
    threshold.setFullYear(threshold.getFullYear() - 18);

    // Pass if staff member is 18 today
    if (date > threshold)
      throw new BadRequestException('Member must be over 18');

    // Default some values if not provided
    return {
      stats: {},
      balance: 0,
      ...member,
    };
  }
}
