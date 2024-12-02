import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItem } from './order_item.entity';
import { OrderItemService } from './order_item.service';
import { OrderItemController } from './order_item.controller';
import { OrderItemCoreModule } from './order_item.core';

@Module({
  imports: [OrderItemCoreModule],
  providers: [],
  controllers: [OrderItemController],
})
export class OrderItemModule {}
