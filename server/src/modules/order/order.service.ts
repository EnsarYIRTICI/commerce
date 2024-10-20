import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {}

  findOrdersByUserId(userId: number) {
    return this.orderRepository.find({
      where: { user: { id: userId } },
      relations: [
        'items',
        'shipmentDetails',
        'paymentDetails',
        'addressDetails',
      ],
    });
  }

  findAll() {
    return this.orderRepository.find();
  }

  findOne(id: number) {
    return this.orderRepository.findOne({ where: { id } });
  }

  create(order: Order) {
    return this.orderRepository.save(order);
  }

  update(id: number, order: Order) {
    return this.orderRepository.update(id, order);
  }

  delete(id: number) {
    return this.orderRepository.delete(id);
  }
}
