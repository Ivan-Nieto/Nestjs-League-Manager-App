import {
  Injectable,
  BadRequestException,
  ValidationPipe,
} from '@nestjs/common';
import validateEntity from 'src/utils/validateEntity';
import { PostPaymentDto } from '../member.dto';

@Injectable()
export class PaymentValidationPipe extends ValidationPipe {
  async transform(value: any) {
    const val = new PostPaymentDto(value);

    const { valid } = await validateEntity(val);

    if (!valid) throw new BadRequestException('Invalid amount');

    return val;
  }
}
