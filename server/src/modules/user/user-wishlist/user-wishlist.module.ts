import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { WishlistCoreModule } from '@modules/wishlist/wishlist.core';
import { UserWishlistFacade } from './user-wishlist.facade';

@Module({
  imports: [WishlistCoreModule],
  providers: [UserWishlistFacade],
  exports: [UserWishlistFacade],
})
export class UserWishlistModule {}
