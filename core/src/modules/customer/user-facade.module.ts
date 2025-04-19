import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrderItem } from '@modules/order/entities/order_item.entity';
import { CartItem } from '@modules/basket/entities/cart_item.entity';

import { UserFacadeController } from './user-facade.controller';

import { WishlistItemModule } from '@modules/wishlist/wishlist_item/wishlist_item.module';
import { WishlistModule } from '@modules/wishlist/wishlist.module';
import { OrderModule } from '@modules/order/order.module';
import { BasketModule } from '@modules/basket/basket.module';
import { ProductReviewModule } from '@modules/review/product_review.module';
import { SKUModule } from '@modules/sku/sku.module';
import { WishlistItemCoreModule } from '@modules/wishlist/wishlist_item/wishlist_item.core';
import { WishlistCoreModule } from '@modules/wishlist/wishlist.core';
import { PaymentCoreModule } from '@modules/payment/payment.core';
import { UserFacadeFactory } from './user-facade.factory';
import { UserAddressModule } from '@modules/user/address/user-address.module';

@Module({
  imports: [
    PaymentCoreModule,
    UserAddressModule,
    BasketModule,
    ProductReviewModule,
    WishlistCoreModule,
    WishlistItemCoreModule,
    SKUModule,
    OrderModule,
  ],
  providers: [UserFacadeFactory],
  controllers: [UserFacadeController],
})
export class UserFacadeModule {}
