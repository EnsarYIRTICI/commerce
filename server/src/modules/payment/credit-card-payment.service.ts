import { BadRequestException, Injectable } from '@nestjs/common';
import { PaymentService, PaymentServiceInitData } from './payment.service';
import { PaymentRequestData } from 'iyzipay';
import { Payment } from './payment.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CartItem } from '@modules/shopping_cart/cart_item/cart_item.entity';
import { Address } from '@modules/address/address.entity';
import { PaymentCardDto } from './dto/paymentCard.dto';
import { User } from '@modules/user/user.entity';
import { IyzicoService } from './iyzico/iyzico.service';
import {
  getPaymentCard,
  getPaymentRequest,
} from 'src/shared/utils/payment.util';

@Injectable()
export class CreditCardPaymentService implements PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,

    private readonly iyzicoService: IyzicoService,
  ) {}

  private paymentServiceInitData: PaymentServiceInitData;

  private paymentCardDto: PaymentCardDto;

  async init(paymentServiceInitData: PaymentServiceInitData) {
    this.paymentServiceInitData = paymentServiceInitData;
  }

  async initCreditCard(paymentCardDto: PaymentCardDto) {
    this.paymentCardDto = paymentCardDto;
  }

  async create(amount: number) {
    let paymentRequest: any = getPaymentRequest(
      this.paymentServiceInitData,
      amount,
    );

    paymentRequest.paymentCard = getPaymentCard(this.paymentCardDto);

    const payment = this.paymentRepository.create({
      basketId: paymentRequest.basketId,
      amount: paymentRequest.price as number,
      createdDate: this.paymentServiceInitData.date,
    });

    // console.log('Payment Request -->', paymentRequest);

    const result =
      await this.iyzicoService.createCreditCardPayment(paymentRequest);

    if (result.status !== 'success') {
      console.log(result);

      throw new BadRequestException('Payment failed.');
    }

    return payment;
  }
}
