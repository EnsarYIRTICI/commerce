import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItem } from './order_item.entity';
import { OrderItemService } from './order_item.service';
import { OrderItemController } from './order_item.controller';

@Module({
  imports: [TypeOrmModule.forFeature([OrderItem])],
  providers: [OrderItemService],
  exports: [OrderItemService],
})
export class OrderItemCoreModule {}
