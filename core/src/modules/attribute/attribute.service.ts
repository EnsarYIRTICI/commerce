import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, In, Repository } from 'typeorm';
import { Attribute } from './entities/attribute.entity';
import { AttributeValue } from './entities/attribute-value.entity';
import { AttributeType } from './entities/attribute-type.entity';

@Injectable()
export class AttributeService {
  constructor(
    @InjectRepository(Attribute)
    private readonly attributeRepository: Repository<Attribute>,

    @InjectRepository(AttributeValue)
    private readonly attributeValueRepository: Repository<AttributeValue>,

    @InjectRepository(AttributeType)
    private readonly attributeTypeRepository: Repository<AttributeType>,
  ) {}

  async validateValueAttribute(
    attributeId: number,
    valueIds: { priority: number; valueId: number }[],
  ) {
    const valueObjArr: FindOptionsWhere<AttributeValue>[] = [];

    valueIds.map((value) => {
      valueObjArr.push({
        id: value.valueId,
      });
    });

    const attribute = await this.attributeRepository.findOne({
      where: { id: attributeId, values: valueObjArr },
      relations: {
        values: true,
      },
    });

    if (!attribute) {
      throw new BadRequestException(
        `Attribute with id ${attributeId} not found`,
      );
    }

    return attribute;
  }

  async findAll() {
    return await this.attributeRepository.find({
      relations: {
        values: true,
        type: true,
      },
    });
  }

  findOne(id: number) {
    return this.attributeRepository.findOne({ where: { id } });
  }

  create(product_attribute: Attribute) {
    return this.attributeRepository.save(product_attribute);
  }

  update(id: number, product_attribute: Attribute) {
    return this.attributeRepository.update(id, product_attribute);
  }

  delete(id: number) {
    return this.attributeRepository.delete(id);
  }
}
