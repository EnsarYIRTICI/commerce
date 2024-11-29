import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrderItem } from '@modules/order/order_item/order_item.entity';
import { CartItem } from '@modules/shopping_cart/cart_item/cart_item.entity';
import { ShoppingCartService } from '@modules/shopping_cart/shopping_cart.service';
import { ShoppingCart } from '@modules/shopping_cart/shopping_cart.entity';
import { ProductVariantService } from '@modules/product/product_variant/product_variant.service';
import { ProductVariant } from '@modules/product/product_variant/product_variant.entity';
import { CartItemService } from '@modules/shopping_cart/cart_item/cart_item.service';
import { UserCartFacade } from './user-cart.facade';
import { User } from '../user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CartItem, ShoppingCart, ProductVariant, User]),
  ],
  providers: [
    UserCartFacade,
    ShoppingCartService,
    ProductVariantService,
    CartItemService,
  ],
  exports: [UserCartFacade],
})
export class UserCartModule {}
