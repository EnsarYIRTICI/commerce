import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrderItem } from '@modules/order/order_item/order_item.entity';
import { CartItem } from '@modules/cart_item/cart_item.entity';

import { UserFacadeController } from './user-facade.controller';
import { UserCartModule } from './user-cart/user-cart.module';
import { UserWishlistModule } from './user-wishlist/user-wishlist.module';
import { UserWishlistItemModule } from './user-wishlist-item/user-wishlist-item.module';
import { UserOrderModule } from './user-order/user-order.module';
import { UserReviewModule } from './user-review/user-review.module';

@Module({
  imports: [
    UserCartModule,
    UserOrderModule,
    UserWishlistModule,
    UserWishlistItemModule,
    UserReviewModule,
  ],
  providers: [],
  controllers: [UserFacadeController],
})
export class UserFacadeModule {}
