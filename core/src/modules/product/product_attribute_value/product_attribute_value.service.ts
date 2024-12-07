import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { ProductAttributeValue } from './product_attribute_value.entity';
import { Roles } from 'src/shared/decorators/role.decorator';

@Injectable()
export class ProductAttributeValueService {
  constructor(
    @InjectRepository(ProductAttributeValue)
    private product_attribute_valueRepository: Repository<ProductAttributeValue>,
  ) {}

  async findByIds(ids: number[]) {
    return await this.product_attribute_valueRepository.find({
      where: {
        id: In(ids),
      },
    });
  }

  findAll() {
    return this.product_attribute_valueRepository.find();
  }

  findOne(id: number) {
    return this.product_attribute_valueRepository.findOne({ where: { id } });
  }

  create(product_attribute_value: ProductAttributeValue) {
    return this.product_attribute_valueRepository.save(product_attribute_value);
  }

  update(id: number, product_attribute_value: ProductAttributeValue) {
    return this.product_attribute_valueRepository.update(
      id,
      product_attribute_value,
    );
  }

  delete(id: number) {
    return this.product_attribute_valueRepository.delete(id);
  }
}
