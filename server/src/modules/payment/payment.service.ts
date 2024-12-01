import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { Payment } from './payment.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
  ) {}

  async find(): Promise<Payment[]> {
    return await this.paymentRepository.find();
  }

  async findOne(id: number): Promise<Payment> {
    const payment = await this.paymentRepository.findOne({ where: { id } });
    if (!payment) {
      throw new NotFoundException(`Payment with ID ${id} not found.`);
    }
    return payment;
  }

  async create({
    queryRunner,
    basketId,
    price,
    date,
  }: {
    queryRunner: QueryRunner;
    basketId: string;
    price: number;
    date: Date;
  }) {
    let payment = queryRunner.manager.create(Payment, {
      basketId: basketId,
      amount: price,
      createdDate: date,
    });

    return await queryRunner.manager.save(payment);
  }
}
