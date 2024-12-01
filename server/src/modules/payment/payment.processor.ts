import { Injectable, NotFoundException } from '@nestjs/common';

import { PaymentStrategy } from './payment-strategy/payment.strategy';
import { Address } from '@modules/address/address.entity';
import { CartItem } from '@modules/shopping_cart/cart_item/cart_item.entity';
import { User } from '@modules/user/user.entity';

@Injectable()
export class PaymentProcessor {
  private paymentStrategy: PaymentStrategy;

  init(paymentStrategy: PaymentStrategy) {
    this.paymentStrategy = paymentStrategy;
  }

  async pay(
    amount: number,
    {
      user,
      ip,
      billingAddress,
      shippingAddress,
      cartItems,
      date,
    }: {
      user: User;
      ip: string;
      billingAddress: Address;
      shippingAddress: Address;
      cartItems: CartItem[];
      date: Date;
    },
  ) {
    return await this.paymentStrategy.pay(amount, {
      user,
      ip,
      billingAddress,
      shippingAddress,
      cartItems,
      date,
    });
  }
}
