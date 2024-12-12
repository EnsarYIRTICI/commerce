import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';

import { OrderStatusCoreModule } from './order_status/order_status.core';
import { OrderItemCoreModule } from './order_item/order_item.core';

@Module({
  imports: [
    OrderItemCoreModule,
    OrderStatusCoreModule,
    TypeOrmModule.forFeature([Order]),
  ],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderCoreModule {}
