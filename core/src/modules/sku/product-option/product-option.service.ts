import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductOption } from './entities/product-option.entity';

@Injectable()
export class ProductOptionService {
  constructor(
    @InjectRepository(ProductOption)
    private readonly productOptionRepository: Repository<ProductOption>,
  ) {}

  async create(data: Partial<ProductOption>): Promise<ProductOption> {
    const option = this.productOptionRepository.create(data);
    return this.productOptionRepository.save(option);
  }

  async findAll(): Promise<ProductOption[]> {
    return this.productOptionRepository.find({ relations: ['values'] });
  }

  async findOne(id: number): Promise<ProductOption> {
    return this.productOptionRepository.findOne({ where: { id }, relations: ['values'] });
  }

  async update(id: number, data: Partial<ProductOption>): Promise<ProductOption> {
    await this.productOptionRepository.update(id, data);
    return this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.productOptionRepository.delete(id);
  }
}
