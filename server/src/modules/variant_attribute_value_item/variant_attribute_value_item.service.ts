import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VariantAttributeValueItem } from './variant_attribute_value_item.entity';

@Injectable()
export class VariantAttributeValueItemService {
  constructor(
    @InjectRepository(VariantAttributeValueItem)
    private readonly variantAttributeValueItemRepository: Repository<VariantAttributeValueItem>,
  ) {}

  async create(
    data: Partial<VariantAttributeValueItem>,
  ): Promise<VariantAttributeValueItem> {
    const item = this.variantAttributeValueItemRepository.create(data);
    return this.variantAttributeValueItemRepository.save(item);
  }

  async findAll(): Promise<VariantAttributeValueItem[]> {
    return this.variantAttributeValueItemRepository.find();
  }

  async findOne(id: number): Promise<VariantAttributeValueItem> {
    return this.variantAttributeValueItemRepository.findOne({ where: { id } });
  }

  async update(
    id: number,
    data: Partial<VariantAttributeValueItem>,
  ): Promise<VariantAttributeValueItem> {
    await this.variantAttributeValueItemRepository.update(id, data);
    return this.variantAttributeValueItemRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    await this.variantAttributeValueItemRepository.delete(id);
  }
}
