import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Staff } from './models/staff.entity';
import { UpdateStaffDto, CreateStaffDto } from './staff.dto';
@Injectable()
export class StaffService {
  constructor(
    @InjectRepository(Staff)
    private connection: Repository<Staff>,
  ) {}

  /**
   * @description Finds a staff member by their id and throws a 404 if they are not found
   * @throws
   *
   * @param {string} staffId Id of staff member
   * @returns {Staff}
   */
  private async exists(staffId: string): Promise<Staff> {
    return this.connection
      .findOne(staffId)
      .then((s) => {
        if (!s) throw new HttpException('Not Found', 404);
        return s;
      })
      .catch((error) => {
        console.error(error);
        throw new HttpException('Failed to validate staff', 500);
      });
  }

  /**
   * @description Gets all staff
   * @throws
   *
   * @returns {Staff}
   */
  public async getStaff(): Promise<Array<Staff>> {
    return this.connection.find().catch((error) => {
      console.error(error);
      throw new HttpException('Failed to get staff', 500);
    });
  }

  /**
   * @description Finds a single staff member by their id
   * @throws
   *
   * @param {string} staffId Staff member id
   * @returns {Staff}
   */
  public async getStaffMember(staffId: string): Promise<Staff> {
    return this.exists(staffId);
  }

  /**
   * @description Creates a new staff
   * @throws
   *
   * @param {Staff} config New Staff member information
   * @returns {string}
   */
  public async createStaff(config: CreateStaffDto): Promise<string> {
    const staff = new Staff(config);
    return this.connection
      .save(staff)
      .then(() => 'Done')
      .catch((error) => {
        console.error(error);
        throw new HttpException('Failed to save new staff member', 500);
      });
  }

  /**
   * @description Updates a staff member
   * @throws
   *
   * @param {string} staffId Staff uuid identifier
   * @param {Object} data Update data
   * @returns {string} Done
   */
  public async updateStaff(
    staffId: string,
    data: UpdateStaffDto,
  ): Promise<string> {
    const staff = await this.exists(staffId);
    staff.update(data);

    return this.connection
      .save(staff)
      .then(() => 'Done')
      .catch((error) => {
        console.error(error);
        throw new HttpException('Failed to update staff', 500);
      });
  }
}
