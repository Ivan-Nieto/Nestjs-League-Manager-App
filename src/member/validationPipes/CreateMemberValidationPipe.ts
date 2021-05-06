import {
  BadRequestException,
  Injectable,
  ValidationPipe,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { MemberDto } from '../member.dto';
import { PersonDto } from '../../person/person.dto';

@Injectable()
export class CreateMemberValidationPipe extends ValidationPipe {
  async transform(value: any) {
    const member = new MemberDto({
      balance: value.balance,
      team_id: value.team_id,
      stats: value.stats,
    });

    const person = new PersonDto({
      name: value?.name,
      last_name: value?.last_name,
      email: value?.email,
      dob: value?.dob,
      role: value.role,
    });

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

    // Default some values if not provided
    return {
      stats: {},
      balance: 0,
      ...value,
    };
  }
}
