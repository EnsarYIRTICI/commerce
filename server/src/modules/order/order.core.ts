import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';

import { OrderStatusCoreModule } from './order_status/order_status.core';
import { ProductVariantCoreModule } from '@modules/product/product_variant/product-variant.core';

@Module({
  imports: [
    ProductVariantCoreModule,
    OrderStatusCoreModule,
    TypeOrmModule.forFeature([Order]),
  ],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderCoreModule {}
