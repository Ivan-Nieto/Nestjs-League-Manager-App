import {
  Injectable,
  BadRequestException,
  ValidationPipe,
} from '@nestjs/common';
import { IsNotEmpty, validate, IsInt, IsPositive } from 'class-validator';

class PaymentValidationDto {
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  amount: number;
}

@Injectable()
export class PaymentValidationPipe extends ValidationPipe {
  async transform(value: any) {
    const val = new PaymentValidationDto();
    val.amount = value?.amount;

    await validate(val)
      .then((errors) => {
        if (errors.length) throw new BadRequestException('Invalid amount');
      })
      .catch((error) => {
        console.error(error);
        throw new BadRequestException('Invalid amount');
      });

    return val;
  }
}
