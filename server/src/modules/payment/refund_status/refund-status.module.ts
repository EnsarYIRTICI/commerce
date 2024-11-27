
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RefundStatusService } from './refund-status.service';
import { RefundStatusController } from './refund-status.controller';
import { RefundStatus } from './refund-status.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RefundStatus])],
  controllers: [RefundStatusController],
  providers: [RefundStatusService],
})
export class RefundStatusModule {}
