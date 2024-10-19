
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentDetail } from './payment_detail.entity';

@Injectable()
export class PaymentDetailService {
  constructor(
    @InjectRepository(PaymentDetail)
    private payment_detailRepository: Repository<PaymentDetail>,
  ) {}

  findAll() {
    return this.payment_detailRepository.find();
  }

  findOne(id: number) {
    return this.payment_detailRepository.findOne({ where: { id } });
  }

  create(payment_detail: PaymentDetail) {
    return this.payment_detailRepository.save(payment_detail);
  }

  update(id: number, payment_detail: PaymentDetail) {
    return this.payment_detailRepository.update(id, payment_detail);
  }

  delete(id: number) {
    return this.payment_detailRepository.delete(id);
  }
}
