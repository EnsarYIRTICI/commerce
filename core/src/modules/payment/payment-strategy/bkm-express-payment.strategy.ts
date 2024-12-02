import { BadRequestException, Inject, Injectable } from '@nestjs/common';

import Iyzipay, { PaymentRequestData } from 'iyzipay';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CartItem } from '@modules/cart_item/cart_item.entity';
import { Address } from '@modules/address/address.entity';
import { PaymentCardDto } from '../dto/paymentCard.dto';
import { User } from '@modules/user/user.entity';
import { IyzicoService } from '../payment-system/iyzico/iyzico.service';
import { Payment } from '../payment.entity';
import { PayData, PaymentStrategy } from './payment.strategy';

import { v4 as uuidv4 } from 'uuid';

import {
  getPaymentCard,
  getBasketItems,
  getBillingAddress,
  getShippingAddress,
  getBuyer,
} from '@utils/iyzico.util';
import { PaymentSystem } from '../payment-system/payment.system';

@Injectable()
export class BKMExpressPaymentStrategy implements PaymentStrategy {
  constructor(private readonly paymentSystem: PaymentSystem) {}

  async pay(amount: number, payData: PayData) {
    const user = payData.user;
    const ip = payData.ip;
    const date = payData.date;

    const billingAddress = payData.billingAddress;
    const shippingAddress = payData.shippingAddress;
    const cartItems = payData.cartItems;

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
