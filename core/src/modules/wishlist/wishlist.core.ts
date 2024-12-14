import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wishlist } from './wishlist.entity';
import { WishlistService } from './wishlist.service';
import { WishlistController } from './wishlist.controller';
import { WishlistItemModule } from './wishlist_item/wishlist_item.module';
import { WishlistItemCoreModule } from './wishlist_item/wishlist_item.core';

@Module({
  imports: [WishlistItemCoreModule, TypeOrmModule.forFeature([Wishlist])],
  providers: [WishlistService],
  exports: [WishlistService],
})
export class WishlistCoreModule {}
