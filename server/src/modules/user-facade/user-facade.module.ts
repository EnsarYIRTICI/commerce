import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrderItem } from '@modules/order/order_item/order_item.entity';
import { CartItem } from '@modules/shopping_cart/cart_item/cart_item.entity';

import { ProductVariantService } from '@modules/product/product_variant/product_variant.service';
import { ProductVariant } from '@modules/product/product_variant/product_variant.entity';
import { UserFacadeController } from './user-facade.controller';
import { UserCartModule } from './user-cart/user-cart.module';
import { UserWishlistModule } from './user-wishlist/user-wishlist.module';
import { UserWishlistItemModule } from './user-wishlist-item/user-wishlist-item.module';
import { UserOrderModule } from './user-order/user-order.module';

@Module({
  imports: [
    UserCartModule,
    UserOrderModule,
    UserWishlistModule,
    UserWishlistItemModule,
  ],
  providers: [],
  controllers: [UserFacadeController],
})
export class UserFacadeModule {}
