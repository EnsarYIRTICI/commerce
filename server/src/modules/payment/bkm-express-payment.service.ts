import { BadRequestException, Injectable } from '@nestjs/common';

import { PaymentRequestData } from 'iyzipay';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CartItem } from '@modules/shopping_cart/cart_item/cart_item.entity';
import { Address } from '@modules/address/address.entity';
import { PaymentCardDto } from './dto/paymentCard.dto';
import { User } from '@modules/user/user.entity';
import { IyzicoService } from './iyzico/iyzico.service';
import { getPaymentRequest } from 'src/shared/utils/payment.util';
import { Payment } from './payment.entity';
import { PaymentService, PaymentServiceInitData } from './payment.service';

@Injectable()
export class BKMExpressPaymentService implements PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    private readonly iyzicoService: IyzicoService,
  ) {}

  private paymentServiceInitData: PaymentServiceInitData;

  async init(paymentServiceInitData: PaymentServiceInitData) {
    this.paymentServiceInitData = paymentServiceInitData;
  }

  async create(amount: number) {
    const paymentRequest = getPaymentRequest(
      this.paymentServiceInitData,
      amount,
    );

    const result = await this.iyzicoService.createBkmPayment(paymentRequest);

    if (result.status !== 'success') {
      throw new BadRequestException(
        'BKM Express payment initialization failed',
      );
    }

    const payment = this.paymentRepository.create({
      basketId: result.basketId,
      amount: amount,
      createdDate: this.paymentServiceInitData.date,
    });

    return payment;
  }
}
