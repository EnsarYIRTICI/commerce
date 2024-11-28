import { BadRequestException, Injectable } from '@nestjs/common';
import {
  PaymentService,
  PaymentServiceInitData,
} from './interface/payment.service';
import { PaymentRequestData } from 'iyzipay';
import { Payment } from './payment.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CartItem } from '@modules/shopping_cart/cart_item/cart_item.entity';
import { Address } from '@modules/address/address.entity';
import { PaymentCardDto } from './dto/paymentCard.dto';
import { User } from '@modules/user/user.entity';
import { IyzicoService } from './iyzico.service';

@Injectable()
export class BankTransferPaymentService implements PaymentService {
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
    const payment = this.paymentRepository.create({
      createdDate: this.paymentServiceInitData.date,
    });

    return payment;
  }
}
