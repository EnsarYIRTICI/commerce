import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentMethod } from './payment_method.entity';
import {
  CreatePaymentMethodDto,
  UpdatePaymentMethodDto,
} from './dto/create_payment_method.dto';

@Injectable()
export class PaymentMethodService {
  constructor(
    @InjectRepository(PaymentMethod)
    private paymentMethodRepository: Repository<PaymentMethod>,
  ) {}

  async create(
    createPaymentMethodDto: CreatePaymentMethodDto,
  ): Promise<PaymentMethod> {
    const paymentMethod = this.paymentMethodRepository.create(
      createPaymentMethodDto,
    );
    return this.paymentMethodRepository.save(paymentMethod);
  }

  async findAll(): Promise<PaymentMethod[]> {
    return this.paymentMethodRepository.find();
  }

  async findOne(id: number): Promise<PaymentMethod> {
    return this.paymentMethodRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async update(
    id: number,
    updatePaymentMethodDto: UpdatePaymentMethodDto,
  ): Promise<PaymentMethod> {
    await this.paymentMethodRepository.update(id, updatePaymentMethodDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.paymentMethodRepository.delete(id);
  }
}
