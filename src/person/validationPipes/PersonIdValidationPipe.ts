import {
  BadRequestException,
  Injectable,
  ValidationPipe,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { PersonIdDto } from '../person.dto';

@Injectable()
export class PersonIdValidationPipe extends ValidationPipe {
  async transform(value: any) {
    const person = new PersonIdDto({ id: value });

    await validate(person)
      .then((errors) => {
        if (errors.length) throw new BadRequestException('Invalid person id');
      })
      .catch((error) => {
        console.error(error);
        throw new BadRequestException('Invalid person id');
      });

    return value;
  }
}
