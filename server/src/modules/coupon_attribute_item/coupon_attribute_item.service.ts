import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CouponAttributeItem } from './coupon_attribute_item.entity';

@Injectable()
export class CouponAttributeItemService {
  constructor(
    @InjectRepository(CouponAttributeItem)
    private readonly attributeItemRepository: Repository<CouponAttributeItem>,
  ) {}

  async create(
    attributeItemData: Partial<CouponAttributeItem>,
  ): Promise<CouponAttributeItem> {
    const attributeItem =
      this.attributeItemRepository.create(attributeItemData);
    return await this.attributeItemRepository.save(attributeItem);
  }

  async findAll(): Promise<CouponAttributeItem[]> {
    return await this.attributeItemRepository.find({
      relations: ['coupon', 'attribute'],
    });
  }

  async findOne(id: number): Promise<CouponAttributeItem> {
    const attributeItem = await this.attributeItemRepository.findOne({
      where: { id },
      relations: ['coupon', 'attribute'],
    });
    if (!attributeItem) {
      throw new NotFoundException(
        `CouponAttributeItem with ID ${id} not found`,
      );
    }
    return attributeItem;
  }

  async update(
    id: number,
    updateData: Partial<CouponAttributeItem>,
  ): Promise<CouponAttributeItem> {
    const attributeItem = await this.findOne(id);
    Object.assign(attributeItem, updateData);
    return await this.attributeItemRepository.save(attributeItem);
  }

  async remove(id: number): Promise<void> {
    const attributeItem = await this.findOne(id);
    await this.attributeItemRepository.remove(attributeItem);
  }
}
