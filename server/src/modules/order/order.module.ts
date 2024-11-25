import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { OrderDomainService } from '@modules/order/order.domain';
import { OrderItem } from '@modules/order_item/order_item.entity';
import { Address } from '@modules/address/address.entity';
import { AddressService } from '@modules/address/address.service';
import { ProductVariantService } from '@modules/product_variant/product_variant.service';
import { ProductVariant } from '@modules/product_variant/product_variant.entity';
import { Product } from '@modules/product/product.entity';
import { OrderSharedModule } from './order.shared';

@Module({
  imports: [OrderSharedModule, TypeOrmModule.forFeature([Order])],
  providers: [OrderService, OrderDomainService],
  controllers: [OrderController],
})
export class OrderModule {}
