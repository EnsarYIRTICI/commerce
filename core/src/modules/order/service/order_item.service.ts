import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { OrderItem } from '../entities/order_item.entity';

@Injectable()
export class OrderItemService {
  constructor(
    @InjectRepository(OrderItem)
    private order_itemRepository: Repository<OrderItem>,
  ) {}

  async findByIds(ids: number[]) {
    return await this.order_itemRepository.find({ where: { id: In(ids) } });
  }

  findAll() {
    return this.order_itemRepository.find();
  }

  findOne(id: number) {
    return this.order_itemRepository.findOne({ where: { id } });
  }

  create(order_item: OrderItem) {
    return this.order_itemRepository.save(order_item);
  }

  update(id: number, order_item: OrderItem) {
    return this.order_itemRepository.update(id, order_item);
  }

  delete(id: number) {
    return this.order_itemRepository.delete(id);
  }
}
