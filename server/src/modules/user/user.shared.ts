import { Module } from '@nestjs/common';

import { UserCartModule } from './user-cart/user-cart.module';
import { UserOrderModule } from './user-order/user-order.module';
import { UserWishlistModule } from './user-wishlist/user-wishlist.module';
import { UserWishlistItemModule } from './user-wishlist-item/user-wishlist-item.module';

@Module({
  imports: [
    UserCartModule,
    UserOrderModule,
    UserWishlistModule,
    UserWishlistItemModule,
  ],
  exports: [
    UserCartModule,
    UserOrderModule,
    UserWishlistModule,
    UserWishlistItemModule,
  ],
})
export class UserSharedModule {}
