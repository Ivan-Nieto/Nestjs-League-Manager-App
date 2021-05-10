import { BadRequestException, ValidationPipe } from '@nestjs/common';
import validateEntity from 'src/utils/validateEntity';
import { StaffIdDto } from '../staff.dto';

export class ValidateStaffIdPipe extends ValidationPipe {
  async transform(value: any) {
    const staff = new StaffIdDto({ id: value });

    const { valid } = await validateEntity(staff);
    if (!valid) throw new BadRequestException('Invalid staff id');

    return staff.id;
  }
}
