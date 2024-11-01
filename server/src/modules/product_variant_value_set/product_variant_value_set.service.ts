import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductVariantValueSet } from './product_variant_value_set.entity';

@Injectable()
export class ProductVariantValueSetService {
  constructor(
    @InjectRepository(ProductVariantValueSet)
    private readonly productVariantValueSetRepository: Repository<ProductVariantValueSet>,
  ) {}

  async create(
    data: Partial<ProductVariantValueSet>,
  ): Promise<ProductVariantValueSet> {
    const item = this.productVariantValueSetRepository.create(data);
    return this.productVariantValueSetRepository.save(item);
  }

  async findAll(): Promise<ProductVariantValueSet[]> {
    return this.productVariantValueSetRepository.find();
  }

  async findOne(id: number): Promise<ProductVariantValueSet> {
    return this.productVariantValueSetRepository.findOne({ where: { id } });
  }

  async update(
    id: number,
    data: Partial<ProductVariantValueSet>,
  ): Promise<ProductVariantValueSet> {
    await this.productVariantValueSetRepository.update(id, data);
    return this.productVariantValueSetRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    await this.productVariantValueSetRepository.delete(id);
  }
}
