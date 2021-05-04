import { BadRequestException, ValidationPipe } from '@nestjs/common';
import validObject from '../../utils/validObject';
import { Member } from '../models/member.entity';
import { Person } from '../../person/models/person.entity';
import { validate } from 'class-validator';

export interface UpdateObject {
  role?: string;
  status?: string;
  balance?: number;
  team_id?: string;
  stats?: {
    shots_on_goal?: number;
  };
  name?: string;
  last_name?: string;
  phone?: number;
  email?: string;
  dob?: Date;
  age?: number;
}

export class UpdateMemberValidationPipe extends ValidationPipe {
  async transform(value: any) {
    if (!validObject(value) || Object.keys(value).length === 0)
      throw new BadRequestException('Invalid body');

    // Update variable in entity if defined in request body
    const addIfDefined = (entity: any, key: string) => {
      if (value[key] == null) return false;
      entity[key] = value[key];
      return true;
    };

    const Error = (arr?: Array<any>) =>
      new BadRequestException(
        `Invalid parameters${arr ? ` :${arr?.join(', ')}` : ''}`,
      );

    const member = new Member();
    let memberUpdate = false; // Avoid validating if member isn't being updated
    ['role', 'status', 'balance', 'team_id', 'stats'].forEach(
      (e) => (memberUpdate = addIfDefined(member, e)),
    );

    const person = new Person();
    let personUpdate = false; // Avoid validating if person isn't being updated
    ['name', 'last_name', 'phone', 'email', 'dob', 'age'].forEach(
      (e) => (personUpdate = addIfDefined(person, e)),
    );

    // Validate data
    const val = async (e: any) =>
      validate(e, { skipMissingProperties: true, forbidUnknownValues: true })
        .then((errors) => {
          if (errors.length) throw Error(errors);
        })
        .catch((error) => {
          console.error(error);
          throw Error();
        });

    if (memberUpdate) await val(member);
    if (personUpdate) await val(person);

    return value;
  }
}
