import {
  Injectable,
  BadRequestException,
  ValidationPipe,
} from '@nestjs/common';

@Injectable()
export class CreateMatchValidationPipe extends ValidationPipe {
  transform(value: any) {
    throw new BadRequestException('Validation Not Implemented');
    return value;
  }
}
