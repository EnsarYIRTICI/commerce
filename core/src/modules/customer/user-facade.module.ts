import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrderItem } from '@modules/order/order_item/order_item.entity';
import { CartItem } from '@modules/cart_item/entities/cart_item.entity';

import { UserFacadeController } from './user-facade.controller';

import { WishlistItemModule } from '@modules/wishlist/wishlist_item/wishlist_item.module';
import { WishlistModule } from '@modules/wishlist/wishlist.module';
import { OrderModule } from '@modules/order/order.module';
import { CartItemModule } from '@modules/cart_item/cart_item.module';
import { ProductReviewModule } from '@modules/sku/product_review/product_review.module';
import { SKUModule } from '@modules/sku/sku.module';
import { WishlistItemCoreModule } from '@modules/wishlist/wishlist_item/wishlist_item.core';
import { WishlistCoreModule } from '@modules/wishlist/wishlist.core';
import { OrderCoreModule } from '@modules/order/order.core';
import { AddressCoreModule } from '@modules/address/address.core';
import { PaymentCoreModule } from '@modules/payment/payment.core';
import { UserFacadeFactory } from './user-facade.factory';

@Module({
  imports: [
    PaymentCoreModule,
    AddressCoreModule,
    CartItemModule,
    ProductReviewModule,
    WishlistCoreModule,
    WishlistItemCoreModule,
    SKUModule,
    OrderCoreModule,
  ],
  providers: [UserFacadeFactory],
  controllers: [UserFacadeController],
})
export class UserFacadeModule {}
