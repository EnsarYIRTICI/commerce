import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attribute } from './entities/attribute.entity';

@Injectable()
export class AttributeService {
  constructor(
    @InjectRepository(Attribute)
    private product_attributeRepository: Repository<Attribute>,
  ) {}

  findValues() {
    return this.product_attributeRepository.find({
      relations: ['values'],
    });
  }

  findAll() {
    return this.product_attributeRepository.find();
  }

  findOne(id: number) {
    return this.product_attributeRepository.findOne({ where: { id } });
  }

  create(product_attribute: Attribute) {
    return this.product_attributeRepository.save(product_attribute);
  }

  update(id: number, product_attribute: Attribute) {
    return this.product_attributeRepository.update(id, product_attribute);
  }

  delete(id: number) {
    return this.product_attributeRepository.delete(id);
  }
}
