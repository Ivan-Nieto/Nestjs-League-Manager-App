import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Audit } from './models/audit.entity';
@Injectable()
export class AuditService {
  constructor(
    @InjectRepository(Audit)
    private connection: Repository<Audit>,
  ) {}

  /**
   * @description Finds an audit, if not found throws a 404 error
   * @throws
   *
   * @param {string} auditId Audit uuid
   * @returns {Audit}
   */
  private async exists(auditId: string): Promise<Audit> {
    return this.connection
      .findOne(auditId)
      .then((a) => {
        if (!a) throw new HttpException('Not Found', 404);
        return a;
      })
      .catch((error) => {
        console.error(error);
        throw new HttpException('Failed to validate audit id', 500);
      });
  }

  /**
   * @description Gets all audits
   * @throws
   *
   * @returns {Array<Audit>}
   */
  public async getAudits(): Promise<Array<Audit>> {
    return this.connection.find().catch((error) => {
      console.error(error);
      throw new HttpException('Failed to get audits', 500);
    });
  }

  /**
   * @description Finds and returns an Audit by it's id.
   * @throws
   *
   * @param {string} auditId Audit uuid
   * @returns {Audit}
   */
  public async getAudit(auditId: string): Promise<Audit> {
    return this.exists(auditId);
  }
}
