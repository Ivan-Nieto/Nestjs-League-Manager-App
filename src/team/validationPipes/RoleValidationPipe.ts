import { BadRequestException, ValidationPipe } from '@nestjs/common';
import validateEntity from 'src/utils/validateEntity';
import { Person } from '../../person/models/person.entity';

export class RoleValidationPipe extends ValidationPipe {
  async transform(value: any) {
    if (!value) return value;

    const person = new Person({ role: value });

    const { valid } = await validateEntity(person);
    if (!valid) throw new BadRequestException('Invalid role');

    return value;
  }
}
