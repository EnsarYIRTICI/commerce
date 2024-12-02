
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RefundStatus } from './refund-status.entity';
import { CreateRefundStatusDto } from './dto/create-refund-status.dto';
import { UpdateRefundStatusDto } from './dto/update-refund-status.dto';

@Injectable()
export class RefundStatusService {
  constructor(
    @InjectRepository(RefundStatus)
    private readonly refundStatusRepository: Repository<RefundStatus>,
  ) {}

  async create(createRefundStatusDto: CreateRefundStatusDto): Promise<RefundStatus> {
    const refundStatus = this.refundStatusRepository.create(createRefundStatusDto);
    return this.refundStatusRepository.save(refundStatus);
  }

  async findAll(): Promise<RefundStatus[]> {
    return this.refundStatusRepository.find();
  }

  async findOne(id: number): Promise<RefundStatus> {
    const refundStatus = await this.refundStatusRepository.findOneBy({ id });
    if (!refundStatus) {
      throw new NotFoundException(`RefundStatus with ID ${id} not found`);
    }
    return refundStatus;
  }

  async update(
    id: number,
    updateRefundStatusDto: UpdateRefundStatusDto,
  ): Promise<RefundStatus> {
    const refundStatus = await this.findOne(id);
    Object.assign(refundStatus, updateRefundStatusDto);
    return this.refundStatusRepository.save(refundStatus);
  }

  async remove(id: number): Promise<void> {
    const refundStatus = await this.findOne(id);
    await this.refundStatusRepository.remove(refundStatus);
  }
}
