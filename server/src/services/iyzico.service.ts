import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import Iyzipay, { PaymentRequestData, PaymentResult } from 'iyzipay';

@Injectable()
export class IyzicoService {
  private iyzipay: Iyzipay;

  constructor(private configService: ConfigService) {
    this.iyzipay = new Iyzipay({
      apiKey: this.configService.get<string>('IYZICO_API_KEY'),
      secretKey: this.configService.get<string>('IYZICO_SECRET_KEY'),
      uri: this.configService.get<string>('IYZICO_BASE_URL'),
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
