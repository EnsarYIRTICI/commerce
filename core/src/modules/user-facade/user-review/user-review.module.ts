import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PaymentCoreModule } from '@modules/payment/payment.core';
import { OrderCoreModule } from '@modules/order/order.core';
import { OrderStatusCoreModule } from '@modules/order/order_status/order_status.core';
import { PaymentProcessor } from '@modules/payment/payment.processor';
import { SKUCoreModule } from '@modules/sku/sku.core';

import { AddressCoreModule } from '@modules/address/address.core';
import { UserReviewFacade } from './user-review.facade';
import { ProductReviewCoreModule } from '@modules/sku/product_review/product-review.core';

@Module({
  imports: [ProductReviewCoreModule, SKUCoreModule, OrderCoreModule],
  providers: [UserReviewFacade],
  exports: [UserReviewFacade],
})
export class UserReviewModule {}
