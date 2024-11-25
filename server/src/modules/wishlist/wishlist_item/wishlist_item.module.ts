
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WishlistItem } from './wishlist_item.entity';
import { WishlistItemService } from './wishlist_item.service';
import { WishlistItemController } from './wishlist_item.controller';

@Module({
  imports: [TypeOrmModule.forFeature([WishlistItem])],
  providers: [WishlistItemService],
  controllers: [WishlistItemController],
})
export class WishlistItemModule {}
