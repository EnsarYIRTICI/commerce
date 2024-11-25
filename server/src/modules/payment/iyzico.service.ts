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

  test(data: ApiTestRequestData): Promise<PaymentResult> {
    return new Promise((resolve, reject) => {
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

  createPayment(paymentRequest: PaymentRequestData): Promise<PaymentResult> {
    return new Promise((resolve, reject) => {
      this.iyzipay.payment.create(paymentRequest, (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });
  }
}
