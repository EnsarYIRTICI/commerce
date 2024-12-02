import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrderItem } from '@modules/order/order_item/order_item.entity';
import { CartItem } from '@modules/shopping_cart/cart_item/cart_item.entity';

import { ProductVariantService } from '@modules/product/product_variant/product_variant.service';
import { ProductVariant } from '@modules/product/product_variant/product_variant.entity';
import { CartItemService } from '@modules/shopping_cart/cart_item/cart_item.service';
import { UserCartFacade } from './user-cart.facade';
import { User } from '@modules/user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CartItem, ProductVariant, User])],
  providers: [UserCartFacade, ProductVariantService, CartItemService],
  exports: [UserCartFacade],
})
export class UserCartModule {}
