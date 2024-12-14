import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { WishlistCoreModule } from '@modules/wishlist/wishlist.core';
import { UserWishlistItemFacade } from './user-wishlist-item.facade';
import { WishlistItemCoreModule } from '@modules/wishlist/wishlist_item/wishlist_item.core';
import { SKUCoreModule } from '@modules/sku/sku.core';

@Module({
  imports: [WishlistItemCoreModule, SKUCoreModule],
  providers: [UserWishlistItemFacade],
  exports: [UserWishlistItemFacade],
})
export class UserWishlistItemModule {}
