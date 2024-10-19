
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AttributeValue } from './attribute_value.entity';

@Injectable()
export class AttributeValueService {
  constructor(
    @InjectRepository(AttributeValue)
    private attribute_valueRepository: Repository<AttributeValue>,
  ) {}

  findAll() {
    return this.attribute_valueRepository.find();
  }

  findOne(id: number) {
    return this.attribute_valueRepository.findOne({ where: { id } });
  }

  create(attribute_value: AttributeValue) {
    return this.attribute_valueRepository.save(attribute_value);
  }

  update(id: number, attribute_value: AttributeValue) {
    return this.attribute_valueRepository.update(id, attribute_value);
  }

  delete(id: number) {
    return this.attribute_valueRepository.delete(id);
  }
}
