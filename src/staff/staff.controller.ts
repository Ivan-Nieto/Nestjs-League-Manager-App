import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ValidateDtoPipe } from '../utils/ValidateDtoPipe';
import { CreateStaffDto, UpdateStaffDto } from './staff.dto';
import { StaffService } from './staff.service';
import { ValidateStaffIdPipe } from './validationPipes/ValidateStaffIdPipe';

@Controller('staff')
@ApiTags('Staff')
export class StaffController {
  constructor(private staffService: StaffService) {}

  @Get()
  public async getStaff() {
    return this.staffService.getStaff();
  }

  @Get(':staffId')
  public async getStaffMember(
    @Param('staffId', ValidateStaffIdPipe) staffId: string,
  ) {
    return this.staffService.getStaffMember(staffId);
  }

  @Post()
  public async createStaff(
    @Body(new ValidateDtoPipe(CreateStaffDto)) config: CreateStaffDto,
  ) {
    return this.staffService.createStaff(config);
  }

  @Patch(':staffId')
  public async updateStaffMember(
    @Param('staffId', ValidateStaffIdPipe) staffId: string,
    @Body(new ValidateDtoPipe(UpdateStaffDto)) config: UpdateStaffDto,
  ) {
    return this.staffService.updateStaff(staffId, config);
  }

  @Delete(':staffId')
  public async deleteStaff(
    @Param('staffId', ValidateStaffIdPipe) staffId: string,
  ) {
    return this.staffService.delete(staffId);
  }
}
