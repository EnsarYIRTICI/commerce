import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Refund } from './refund.entity';

@Injectable()
export class RefundService {
  constructor(
    @InjectRepository(Refund)
    private readonly refundRepository: Repository<Refund>,
  ) {}

  // Create a new refund
  async create(refundData: Partial<Refund>): Promise<Refund> {
    const refund = this.refundRepository.create(refundData);
    return await this.refundRepository.save(refund);
  }

  // Retrieve all refunds
  async findAll(): Promise<Refund[]> {
    return await this.refundRepository.find({ relations: ['payment'] });
  }

  // Retrieve a specific refund by ID
  async findOne(id: number): Promise<Refund> {
    return await this.refundRepository.findOne({
      where: { id },
      relations: ['payment'],
    });
  }

  // Update an existing refund
  async update(id: number, refundData: Partial<Refund>): Promise<Refund> {
    const refund = await this.refundRepository.findOne({ where: { id } });
    if (!refund) {
      throw new Error(`Refund with ID ${id} not found`);
    }
    Object.assign(refund, refundData);
    return await this.refundRepository.save(refund);
  }

  // Delete a refund by ID
  async delete(id: number): Promise<void> {
    const result = await this.refundRepository.delete(id);
    if (result.affected === 0) {
      throw new Error(`Refund with ID ${id} not found`);
    }
  }
}
