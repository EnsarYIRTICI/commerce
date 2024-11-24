import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, QueryFailedError, Repository } from 'typeorm';
import { Order } from './order.entity';
import { CreateOrderDto } from './dto/createOrderDto';
import { User } from '@modules/user/user.entity';
import { OrderItem } from '@modules/order_item/order_item.entity';
import { OrderItemService } from '@modules/order_item/order_item.service';
import { ProductVariantService } from '@modules/product_variant/product_variant.service';
import { ProductVariant } from '@modules/product_variant/product_variant.entity';
import { errorMessages } from '@common/errorMessages';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,

    @InjectRepository(OrderItem)
    private order_itemRepository: Repository<OrderItem>,
  ) {}

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
