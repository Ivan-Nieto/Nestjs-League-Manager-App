import {
  Injectable,
  BadRequestException,
  ValidationPipe,
} from '@nestjs/common';

@Injectable()
export class MatchIdValidationPipe extends ValidationPipe {
  transform(value: any) {
    throw new BadRequestException('Validation Not Implemented');
    return value;
  }
}
