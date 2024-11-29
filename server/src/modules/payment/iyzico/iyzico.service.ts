import { Injectable } from '@nestjs/common';

import Iyzipay, {
  ApiTestRequestData,
  PaymentRequestData,
  PaymentResult,
} from 'iyzipay';

@Injectable()
export class IyzicoService {
  private iyzipay: Iyzipay;

  constructor() {
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
    paymentRequest: PaymentRequestData,
  ): Promise<PaymentResult> {
    return new Promise((resolve, reject) => {
      this.iyzipay.payment.create(paymentRequest, (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });
  }

  async createBkmPayment(paymentRequest: any): Promise<any> {
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