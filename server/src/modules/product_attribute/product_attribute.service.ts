
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductAttribute } from './product_attribute.entity';

@Injectable()
export class ProductAttributeService {
  constructor(
    @InjectRepository(ProductAttribute)
    private product_attributeRepository: Repository<ProductAttribute>,
  ) {}

  findAll() {
    return this.product_attributeRepository.find();
  }

  findOne(id: number) {
    return this.product_attributeRepository.findOne({ where: { id } });
  }

  create(product_attribute: ProductAttribute) {
    return this.product_attributeRepository.save(product_attribute);
  }

  update(id: number, product_attribute: ProductAttribute) {
    return this.product_attributeRepository.update(id, product_attribute);
  }

  delete(id: number) {
    return this.product_attributeRepository.delete(id);
  }
}
