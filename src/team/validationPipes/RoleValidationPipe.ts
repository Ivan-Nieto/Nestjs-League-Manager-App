import { BadRequestException, ValidationPipe } from '@nestjs/common';
import validateEntity from 'src/utils/validateEntity';
import { UpdatePersonRoleDto } from '../../person/person.dto';

export class RoleValidationPipe extends ValidationPipe {
  async transform(value: any) {
    if (!value) return value;

    const person = new UpdatePersonRoleDto({ role: value });

    const { valid } = await validateEntity(person);
    if (!valid) throw new BadRequestException('Invalid role');

    return person.role;
  }
}
