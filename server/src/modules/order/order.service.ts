import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, QueryFailedError, QueryRunner, Repository } from 'typeorm';
import { Order } from './order.entity';
import { CreateOrderDto } from './dto/createOrder.dto';
import { User } from '@modules/user/user.entity';

import { OrderItem } from './order_item/order_item.entity';

import { ProductVariantService } from '@modules/product/product_variant/product_variant.service';
import { ProductVariant } from '@modules/product/product_variant/product_variant.entity';
import { errorMessages } from 'src/shared/common/errorMessages';
import { AddressService } from '@modules/address/address.service';

import { Request } from 'express';
import { CartItem } from '@modules/shopping_cart/cart_item/cart_item.entity';
import { Address } from '@modules/address/address.entity';

import { v4 as uuidv4 } from 'uuid';
import { OrderStatusService } from './order_status/order_status.service';
import { Payment } from '@modules/payment/payment.entity';
import { OrderItemService } from './order_item/order_item.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,

    private readonly orderStatusService: OrderStatusService,
    private readonly orderItemService: OrderItemService,
  ) {}

  findAll() {
    return this.orderRepository.find();
  }

  findOne(id: number) {
    return this.orderRepository.findOne({ where: { id } });
  }

  async findAllByUser(user: User) {
    return await this.orderRepository.find({
      where: {
        user: user,
      },
    });
  }

  async create({
    queryRunner,
    date,
    user,
    shippingAddress,
    billingAddress,
    payment,
    cartItems,
  }: {
    queryRunner: QueryRunner;
    date: Date;
    user: User;
    shippingAddress: Address;
    billingAddress: Address;
    payment: Payment;
    cartItems: CartItem[];
  }) {
    const orderStatus = await this.orderStatusService.findOneByName('pending');

    if (!orderStatus) {
      throw new BadRequestException('The order status is null.');
    }

    const orderItems: OrderItem[] = [];

    for (const item of cartItems) {
      const productVariant: ProductVariant = item.productVariant;

      let orderItem = queryRunner.manager.create(OrderItem, {
        productVariant,
        quantity: item.quantity,
        price: productVariant.price,
      });

      orderItems.push(orderItem);
    }

    shippingAddress.id = undefined;
    billingAddress.id = undefined;

    let order = queryRunner.manager.create(Order, {
      createdAt: date,
      orderNumber: uuidv4(),
      status: orderStatus,
      shippingAddress,
      billingAddress,
      user,
      payments: [payment],
      orderItems: orderItems,
    });

    return await queryRunner.manager.save(order);
  }

  update(id: number, order: Order) {
    return this.orderRepository.update(id, order);
  }

  delete(id: number) {
    return this.orderRepository.delete(id);
  }
}
