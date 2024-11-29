import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrderItem } from '@modules/order/order_item/order_item.entity';
import { CartItem } from '@modules/shopping_cart/cart_item/cart_item.entity';

import { ProductVariantService } from '@modules/product/product_variant/product_variant.service';
import { ProductVariant } from '@modules/product/product_variant/product_variant.entity';
import { CartItemService } from '@modules/shopping_cart/cart_item/cart_item.service';
import { User } from '../user.entity';
import { UserOrderFacade } from './user-order.facade';
import { OrderService } from '@modules/order/order.service';
import { UserCartFacade } from '../user-cart/user-cart.facade';
import { PaymentServiceFactory } from '@modules/payment/payment.service.factory';
import { AddressService } from '@modules/address/address.service';
import { Order } from '@modules/order/order.entity';
import { OrderStatusService } from '@modules/order/order_status/order_status.service';
import { OrderStatus } from '@modules/order/order_status/order_status.entity';
import { Address } from '@modules/address/address.entity';
import { UserCartModule } from '../user-cart/user-cart.module';
import { PaymentCoreModule } from '@modules/payment/payment.core';
import { OrderCoreModule } from '@modules/order/order.core';
import { OrderStatusCoreModule } from '@modules/order/order_status/order_status.core';

@Module({
  imports: [
    PaymentCoreModule,
    OrderCoreModule,
    OrderStatusCoreModule,
    UserCartModule,
    TypeOrmModule.forFeature([User, Address, CartItem]),
  ],
  providers: [
    UserOrderFacade,
    AddressService,
    CartItemService,
    PaymentServiceFactory,
  ],
  exports: [UserOrderFacade],
})
export class UserOrderModule {}
