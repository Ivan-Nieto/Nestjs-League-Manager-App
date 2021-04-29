import {
  BadRequestException,
  Injectable,
  ValidationPipe,
} from '@nestjs/common';

/**
 * @description Makes sure a member with the provided id exists
 */
@Injectable()
export class MemberIdValidationPipe extends ValidationPipe {
  transform(value: any) {
    throw new BadRequestException('Validation Not Implemented');
    return value;
  }
}
