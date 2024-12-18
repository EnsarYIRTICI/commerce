import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderService } from './service/order.service';
import { OrderController } from './controller/order.controller';

import { Order } from './order.entity';
import { OrderItem } from './entities/order_item.entity';
import { OrderStatus } from './entities/order_status.entity';
import { OrderItemService } from './service/order_item.service';
import { OrderStatusService } from './service/order_status.service';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderItem, OrderStatus])],
  providers: [OrderService, OrderItemService, OrderStatusService],
  controllers: [OrderController],
  exports: [OrderService],
})
export class OrderModule {}
