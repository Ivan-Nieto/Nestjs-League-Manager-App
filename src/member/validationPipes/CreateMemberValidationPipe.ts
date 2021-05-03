import {
  BadRequestException,
  Injectable,
  ValidationPipe,
} from '@nestjs/common';

@Injectable()
export class CreateMemberValidationPipe extends ValidationPipe {
  transform(value: any) {
    // Make sure id is unique

    // Make sure there is a person associated with person_id if provided

    // Make sure there isn't already a member associated to that person_id if provided

    // Make sure there is a team associated with team_id if provided

    throw new BadRequestException('Validation Not Implemented');
    return value;
  }
}
