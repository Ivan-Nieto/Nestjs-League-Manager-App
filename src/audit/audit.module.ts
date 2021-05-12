import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuditController } from './audit.controller';
import { AuditService } from './audit.service';
import { Audit } from './models/audit.entity';
import { Subscriber } from './audit.subscriber';

@Module({
  imports: [TypeOrmModule.forFeature([Audit])],
  controllers: [AuditController],
  providers: [AuditService, Subscriber],
})
export class AuditModule {}
