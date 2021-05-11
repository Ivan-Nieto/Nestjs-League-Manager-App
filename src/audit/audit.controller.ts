import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuditService } from './audit.service';

@Controller('audit')
@ApiTags('Audit')
export class AuditController {
  constructor(private auditService: AuditService) {}

  @Get()
  public async getAudits() {
    return this.auditService.getAudits();
  }

  @Get(':auditId')
  public async getAudit(@Param('auditId') auditId: string) {
    return this.auditService.getAudit(auditId);
  }
}
