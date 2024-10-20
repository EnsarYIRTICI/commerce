import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderStatus } from './order_status.entity';
import { OrderStatusService } from './order_status.service';
import { OrderStatusController } from './order_status.controller';

@Module({
  imports: [TypeOrmModule.forFeature([OrderStatus])],
  providers: [OrderStatusService],
  controllers: [OrderStatusController],
  exports: [OrderStatusService],
})
export class OrderStatusModule {}