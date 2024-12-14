import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserOrderFacade } from './user-order.facade';

import { PaymentCoreModule } from '@modules/payment/payment.core';
import { OrderCoreModule } from '@modules/order/order.core';
import { OrderStatusCoreModule } from '@modules/order/order_status/order_status.core';
import { PaymentProcessor } from '@modules/payment/payment.processor';
import { SKUCoreModule } from '@modules/sku/sku.core';
import { AddressCoreModule } from '@modules/address/address.core';

@Module({
  imports: [
    AddressCoreModule,
    OrderCoreModule,
    SKUCoreModule,
    PaymentCoreModule,
  ],
  providers: [UserOrderFacade],
  exports: [UserOrderFacade],
})
export class UserOrderModule {}
