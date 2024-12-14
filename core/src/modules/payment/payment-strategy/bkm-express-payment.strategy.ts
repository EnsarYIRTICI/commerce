import { BadRequestException, Inject, Injectable } from '@nestjs/common';

import Iyzipay, { PaymentRequestData } from 'iyzipay';

import { PaymentCardDto } from '../dto/paymentCard.dto';
import { User } from '@modules/user/user.entity';
import { IyzicoService } from '../payment-system/iyzico/iyzico.service';
import { Payment } from '../payment.entity';
import { PayData, PaymentStrategy } from './payment.strategy';

import { v4 as uuidv4 } from 'uuid';

import { PaymentSystem } from '../payment-system/payment.system';

@Injectable()
export class BKMExpressPaymentStrategy implements PaymentStrategy {
  constructor(private readonly paymentSystem: PaymentSystem) {}

  private paymentCardDto: PaymentCardDto;

  init(paymentCardDto: PaymentCardDto): PaymentStrategy {
    this.paymentCardDto = paymentCardDto;
    return this;
  }

  async pay(amount: number, payData: PayData) {
    const result = await this.paymentSystem.createCreditCardPayment(
      payData,
      this.paymentCardDto,
      amount,
    );

    if (result.status !== 'success') {
      console.log(result);

      throw new BadRequestException('Payment failed.');
    }

    return result;
  }
}
