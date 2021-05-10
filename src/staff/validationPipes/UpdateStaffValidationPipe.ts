import { BadRequestException, ValidationPipe } from '@nestjs/common';
import validateEntity from 'src/utils/validateEntity';
import { UpdateStaffDto } from '../staff.dto';

export class UpdateStaffValidationPipe extends ValidationPipe {
  async transform(value: any) {
    const staff = new UpdateStaffDto(value);

    const { valid, message } = await validateEntity(staff);
    if (!valid) throw new BadRequestException(`Invalid parameters: ${message}`);

    return staff;
  }
}
