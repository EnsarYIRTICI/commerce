import { Injectable, NotFoundException } from '@nestjs/common';

import { PayData, PaymentStrategy } from './payment-strategy/payment.strategy';
import { Address } from '@modules/address/address.entity';
import { CartItem } from '@modules/cart_item/cart_item.entity';
import { User } from '@modules/user/user.entity';

@Injectable()
export class PaymentProcessor {
  private paymentStrategy: PaymentStrategy;

  init(paymentStrategy: PaymentStrategy) {
    this.paymentStrategy = paymentStrategy;
  }

  async pay(amount: number, payData: PayData) {
    return await this.paymentStrategy.pay(amount, payData);
  }
}
