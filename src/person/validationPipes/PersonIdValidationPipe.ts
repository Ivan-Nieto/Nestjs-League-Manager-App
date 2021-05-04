import {
  BadRequestException,
  Injectable,
  ValidationPipe,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { PersonDto } from '../person.dto';

@Injectable()
export class PersonIdValidationPipe extends ValidationPipe {
  async transform(value: any) {
    const person = new PersonDto();
    person.id = value || '';

    await validate(person, {
      forbidUnknownValues: true,
      skipMissingProperties: true,
    })
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
