import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './payment.entity';
import { Order } from '@modules/order/order.entity';
import { IyzicoService } from './iyzico.service';
import { PaymentRequestData } from 'iyzipay';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,

    private readonly iyzicoService: IyzicoService,
  ) {}

  findAll() {
    return this.paymentRepository.find();
  }

  findOne(id: number) {
    return this.paymentRepository.findOne({ where: { id } });
  }

  async create(paymentRequest: PaymentRequestData) {
    const payment = this.paymentRepository.create({
      basketId: paymentRequest.basketId,
      amount: paymentRequest.price as number,
      createdDate: new Date(),
    });

    const result = await this.iyzicoService.createPayment(paymentRequest);

    if (result.status !== 'success') {
      throw new BadRequestException('Payment failed.');
    }

    return payment;
  }

  update(id: number, payment: Payment) {
    return this.paymentRepository.update(id, payment);
  }

  delete(id: number) {
    return this.paymentRepository.delete(id);
  }
}
