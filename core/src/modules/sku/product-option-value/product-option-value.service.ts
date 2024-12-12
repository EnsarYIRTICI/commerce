import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductOptionValue } from './entities/product-option-value.entity';

@Injectable()
export class ProductOptionValueService {
  constructor(
    @InjectRepository(ProductOptionValue)
    private readonly productOptionValueRepository: Repository<ProductOptionValue>,
  ) {}

  async create(data: Partial<ProductOptionValue>): Promise<ProductOptionValue> {
    const optionValue = this.productOptionValueRepository.create(data);
    return this.productOptionValueRepository.save(optionValue);
  }

  async findAll(): Promise<ProductOptionValue[]> {
    return this.productOptionValueRepository.find({ relations: ['option'] });
  }

  async findOne(id: number): Promise<ProductOptionValue> {
    return this.productOptionValueRepository.findOne({
      where: { id },
      relations: ['option'],
    });
  }

  async update(
    id: number,
    data: Partial<ProductOptionValue>,
  ): Promise<ProductOptionValue> {
    await this.productOptionValueRepository.update(id, data);
    return this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.productOptionValueRepository.delete(id);
  }
}
