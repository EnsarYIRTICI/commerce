
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductVariant } from './product_variant.entity';

@Injectable()
export class ProductVariantService {
  constructor(
    @InjectRepository(ProductVariant)
    private product_variantRepository: Repository<ProductVariant>,
  ) {}

  findAll() {
    return this.product_variantRepository.find();
  }

  findOne(id: number) {
    return this.product_variantRepository.findOne({ where: { id } });
  }

  create(product_variant: ProductVariant) {
    return this.product_variantRepository.save(product_variant);
  }

  update(id: number, product_variant: ProductVariant) {
    return this.product_variantRepository.update(id, product_variant);
  }

  delete(id: number) {
    return this.product_variantRepository.delete(id);
  }
}
