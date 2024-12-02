import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderStatus } from './order_status.entity';
import { OrderStatusService } from './order_status.service';
import { OrderStatusController } from './order_status.controller';
import { OrderStatusCoreModule } from './order_status.core';

@Module({
  imports: [OrderStatusCoreModule],
  controllers: [OrderStatusController],
})
export class OrderStatusModule {}
