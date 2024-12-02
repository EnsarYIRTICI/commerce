import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentStatus } from './payment_status.entity';
import { CreatePaymentStatusDto } from './dto/create_payment_status.dto';
import { UpdatePaymentStatusDto } from './dto/update_payment_status.dto';

@Injectable()
export class PaymentStatusService {
  constructor(
    @InjectRepository(PaymentStatus)
    private readonly paymentStatusRepository: Repository<PaymentStatus>,
  ) {}

  async create(
    createPaymentStatusDto: CreatePaymentStatusDto,
  ): Promise<PaymentStatus> {
    const paymentStatus = this.paymentStatusRepository.create(
      createPaymentStatusDto,
    );
    return this.paymentStatusRepository.save(paymentStatus);
  }

  async findAll(): Promise<PaymentStatus[]> {
    return this.paymentStatusRepository.find();
  }

  async findOne(id: number): Promise<PaymentStatus> {
    const paymentStatus = await this.paymentStatusRepository.findOneBy({ id });
    if (!paymentStatus) {
      throw new NotFoundException(`PaymentStatus with ID ${id} not found`);
    }
    return paymentStatus;
  }

  async update(
    id: number,
    updatePaymentStatusDto: UpdatePaymentStatusDto,
  ): Promise<PaymentStatus> {
    const paymentStatus = await this.findOne(id);
    Object.assign(paymentStatus, updatePaymentStatusDto);
    return this.paymentStatusRepository.save(paymentStatus);
  }

  async remove(id: number): Promise<void> {
    const paymentStatus = await this.findOne(id);
    await this.paymentStatusRepository.remove(paymentStatus);
  }
}
