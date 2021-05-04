import {
  BadRequestException,
  Injectable,
  ValidationPipe,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { v4 as uuidv4 } from 'uuid';
import { MemberDto } from '../member.dto';
import { PersonDto } from '../../person/person.dto';

@Injectable()
export class CreateMemberValidationPipe extends ValidationPipe {
  async transform(value: any) {
    const member = new MemberDto();
    member.id = uuidv4();
    member.role = value?.role;

    const person = new PersonDto();
    person.id = member.id;
    person.name = value?.name;
    person.last_name = value?.last_name;
    person.email = value?.email;
    person.dob = value?.dob;

    const Error = (arr?: Array<any>) =>
      new BadRequestException(
        `Invalid parameters${arr ? ` :${arr?.join(', ')}` : ''}`,
      );

    const val = async (e: any) =>
      validate(e)
        .then((errors) => {
          if (errors.length) throw Error(errors);
        })
        .catch((error) => {
          console.error(error);
          throw Error();
        });

    await val(member);
    await val(person);

    return {
      ...value,
      id: uuidv4(),
    };
  }
}
