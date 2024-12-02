import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentCurrency } from './payment-currency.entity';

@Injectable()
export class PaymentCurrencyService {
  constructor(
    @InjectRepository(PaymentCurrency)
    private readonly paymentCurrencyRepository: Repository<PaymentCurrency>,
  ) {}

  async create(data: Partial<PaymentCurrency>): Promise<PaymentCurrency> {
    const paymentCurrency = this.paymentCurrencyRepository.create(data);
    return await this.paymentCurrencyRepository.save(paymentCurrency);
  }

  async findAll(): Promise<PaymentCurrency[]> {
    return await this.paymentCurrencyRepository.find();
  }

  async findOne(id: number): Promise<PaymentCurrency> {
    const paymentCurrency = await this.paymentCurrencyRepository.findOne({
      where: { id },
    });
    if (!paymentCurrency) {
      throw new NotFoundException('Payment currency not found');
    }
    return paymentCurrency;
  }

  async update(
    id: number,
    data: Partial<PaymentCurrency>,
  ): Promise<PaymentCurrency> {
    await this.paymentCurrencyRepository.update(id, data);
    return this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    const result = await this.paymentCurrencyRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Payment currency not found');
    }
  }
}
