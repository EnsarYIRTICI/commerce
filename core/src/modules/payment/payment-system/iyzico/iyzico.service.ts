import { Injectable } from '@nestjs/common';

import Iyzipay, {
  ApiTestRequestData,
  PaymentRequestData,
  PaymentResult,
  ThreeDSInitializePaymentRequestData,
  ThreeDSInitializePaymentResult,
} from 'iyzipay';
import { PaymentSystem } from '../payment.system';
import { IyzicoUtil } from '@shared/utils/iyzico.util';
import { PayData } from '@modules/payment/payment-strategy/payment.strategy';
import { v4 as uuidv4 } from 'uuid';
import { PaymentCardDto } from '@modules/payment/dto/paymentCard.dto';

@Injectable()
export class IyzicoService implements PaymentSystem {
  private iyzipay: Iyzipay;

  constructor(private readonly iyzicoUtil: IyzicoUtil) {
    this.iyzipay = new Iyzipay({
      apiKey: process.env.IYZIPAY_API_KEY,
      secretKey: process.env.IYZIPAY_SECRET_KEY,
      uri: process.env.IYZIPAY_BASE_URL,
    });
  }

  async test(): Promise<PaymentResult> {
    return new Promise((resolve, reject) => {
      const data: ApiTestRequestData = {
        conversationId: 'id-123',
        locale: Iyzipay.LOCALE.TR,
      };

      this.iyzipay.apiTest.retrieve(
        data,
        (error: any, result: PaymentResult) => {
          if (error) {
            return reject(error);
          }
          resolve(result);
        },
      );
    });
  }

  async createCreditCardPayment(
    payData: PayData,
    paymentCard: PaymentCardDto,
    amount: number,
  ): Promise<PaymentResult> {
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

      buyer: this.iyzicoUtil.getBuyer(ip, user, billingAddress),
      shippingAddress: this.iyzicoUtil.getShippingAddress(shippingAddress),
      billingAddress: this.iyzicoUtil.getBillingAddress(billingAddress),
      basketItems: this.iyzicoUtil.getBasketItems(cartItems),

      paymentCard: this.iyzicoUtil.getPaymentCard(paymentCard),
    };
    return new Promise((resolve, reject) => {
      this.iyzipay.payment.create(paymentRequest, (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });
  }

  async createBkmPayment(
    payData: PayData,
    amount: number,
  ): Promise<ThreeDSInitializePaymentResult> {
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

      buyer: this.iyzicoUtil.getBuyer(ip, user, billingAddress),
      shippingAddress: this.iyzicoUtil.getShippingAddress(shippingAddress),
      billingAddress: this.iyzicoUtil.getBillingAddress(billingAddress),
      basketItems: this.iyzicoUtil.getBasketItems(cartItems),
    };

    return new Promise((resolve, reject) => {
      this.iyzipay.bkmInitialize.create(paymentRequest, (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });
  }
}
