import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wishlist } from './wishlist.entity';
import { WishlistService } from './wishlist.service';
import { WishlistController } from './wishlist.controller';
import { WishlistItemModule } from './wishlist_item/wishlist_item.module';
import { WishlistCoreModule } from './wishlist.core';

@Module({
  imports: [WishlistCoreModule],
  providers: [],
  controllers: [WishlistController],
})
export class WishlistModule {}
