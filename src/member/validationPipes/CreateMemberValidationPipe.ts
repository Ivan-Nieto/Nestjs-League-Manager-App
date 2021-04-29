import {
  BadRequestException,
  Injectable,
  ValidationPipe,
} from '@nestjs/common';

@Injectable()
export class CreateMemberValidationPipe extends ValidationPipe {
  transform(value: any) {
    throw new BadRequestException('Validation Not Implemented');
    return value;
  }
}
