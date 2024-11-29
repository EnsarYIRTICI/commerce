import { Module } from '@nestjs/common';

import { UserCartModule } from './user-cart/user-cart.module';
import { UserOrderModule } from './user-order/user-order.module';

@Module({
  imports: [UserCartModule, UserOrderModule],
  exports: [UserCartModule, UserOrderModule],
})
export class UserSharedModule {}
