import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import Iyzipay, { PaymentRequestData } from 'iyzipay';
import { Payment } from '../payment.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CartItem } from '@modules/shopping_cart/cart_item/cart_item.entity';
import { Address } from '@modules/address/address.entity';
import { PaymentCardDto } from '../dto/paymentCard.dto';
import { User } from '@modules/user/user.entity';
import { IyzicoService } from '../payment-system/iyzico/iyzico.service';
import {
  getPaymentCard,
  getBasketItems,
  getBillingAddress,
  getShippingAddress,
  getBuyer,
} from '@utils/iyzico.util';
import { PaymentStrategy } from './payment.strategy';

import { v4 as uuidv4 } from 'uuid';
import { PaymentSystem } from '../payment-system/payment.system';

@Injectable()
export class CreditCardPaymentStrategy implements PaymentStrategy {
  constructor(
    @Inject('PaymentSystem')
    private readonly paymentSystem: PaymentSystem,
  ) {}

  private paymentCardDto: PaymentCardDto;

  init(paymentCardDto: PaymentCardDto) {
    this.paymentCardDto = paymentCardDto;
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
    const basketId = uuidv4();
    const conversationId = `${user.id}-${date.toDateString()}`;

    let paymentRequest: any = {
      locale: Iyzipay.LOCALE.TR,
      conversationId: conversationId,
      price: amount,
      paidPrice: amount,
      currency: Iyzipay.CURRENCY.TRY,
      installments: 1,
      basketId: basketId,
      paymentChannel: Iyzipay.PAYMENT_CHANNEL.WEB,
      paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,

      buyer: getBuyer(ip, user, billingAddress),
      shippingAddress: getShippingAddress(shippingAddress),
      billingAddress: getBillingAddress(billingAddress),
      basketItems: getBasketItems(cartItems),

      paymentCard: getPaymentCard(this.paymentCardDto),
    };

    const result =
      await this.paymentSystem.createCreditCardPayment(paymentRequest);

    if (result.status !== 'success') {
      console.log(result);

      throw new BadRequestException('Payment failed.');
    }

    return result;
  }
}
