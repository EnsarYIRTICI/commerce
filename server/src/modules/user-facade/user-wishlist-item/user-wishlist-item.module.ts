import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { WishlistCoreModule } from '@modules/wishlist/wishlist.core';
import { UserWishlistItemFacade } from './user-wishlist-item.facade';
import { WishlistItemCoreModule } from '@modules/wishlist/wishlist_item/wishlist_item.core';
import { ProductVariantCoreModule } from '@modules/product/product_variant/product-variant.core';

@Module({
  imports: [WishlistItemCoreModule, ProductVariantCoreModule],
  providers: [UserWishlistItemFacade],
  exports: [UserWishlistItemFacade],
})
export class UserWishlistItemModule {}
