import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { OrderItem } from './order_item/order_item.entity';

import { Address } from '@modules/address/address.entity';
import { AddressService } from '@modules/address/address.service';
import { ProductVariantService } from '@modules/product/product_variant/product_variant.service';
import { ProductVariant } from '@modules/product/product_variant/product_variant.entity';
import { Product } from '@modules/product/product.entity';
import { OrderSharedModule } from './order.shared';
import { OrderItemModule } from './order_item/order_item.module';
import { OrderStatusModule } from './order_status/order_status.module';
import { AddressDetailModule } from './address_detail/address_detail.module';

@Module({
  imports: [
    OrderItemModule,
    OrderStatusModule,
    AddressDetailModule,
    TypeOrmModule.forFeature([Order]),
    OrderSharedModule,
  ],
  providers: [OrderService],
  controllers: [OrderController],
})
export class OrderModule {}
