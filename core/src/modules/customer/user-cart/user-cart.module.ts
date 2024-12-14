import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrderItem } from '@modules/order/order_item/order_item.entity';
import { CartItem } from '@modules/cart_item/entities/cart_item.entity';

import { CartItemService } from '@modules/cart_item/cart_item.service';
import { UserCartFacade } from './user-cart.facade';
import { User } from '@modules/user/user.entity';
import { CartItemCoreModule } from '@modules/cart_item/cart_item.core';
import { SKUCoreModule } from '@modules/sku/sku.core';

@Module({
  imports: [SKUCoreModule, CartItemCoreModule],
  providers: [UserCartFacade],
  exports: [UserCartFacade],
})
export class UserCartModule {}
