import { BadRequestException, ValidationPipe } from '@nestjs/common';
import validateEntity from '../../utils/validateEntity';
import { CreateStaffDto } from '../staff.dto';

export class ValidateStaffIdPipe extends ValidationPipe {
  async transform(value: any) {
    const staff = new CreateStaffDto(value);

    const { valid, message } = await validateEntity(staff);
    if (!valid) throw new BadRequestException(`Invalid parameters: ${message}`);

    // Make sure staff member is over 18
    const date = new Date(value.dob);
    const threshold = new Date();
    threshold.setFullYear(threshold.getFullYear() - 18);

    // Pass if staff member is 18 today
    if (date > threshold)
      throw new BadRequestException('Staff member must be over 18');

    return staff;
  }
}
