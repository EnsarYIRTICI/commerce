
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './payment.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
  ) {}

  findAll() {
    return this.paymentRepository.find();
  }

  findOne(id: number) {
    return this.paymentRepository.findOne({ where: { id } });
  }

  create(payment: Payment) {
    return this.paymentRepository.save(payment);
  }

  update(id: number, payment: Payment) {
    return this.paymentRepository.update(id, payment);
  }

  delete(id: number) {
    return this.paymentRepository.delete(id);
  }
}
