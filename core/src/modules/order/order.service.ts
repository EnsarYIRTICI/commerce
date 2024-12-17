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

import { errorMessages } from 'src/shared/common/errorMessages';

import { Request } from 'express';
import { CartItem } from '@modules/cart_item/entities/cart_item.entity';

import { v4 as uuidv4 } from 'uuid';
import { OrderStatusService } from './order_status/order_status.service';
import { Payment } from '@modules/payment/payment.entity';
import { OrderItemService } from './order_item/order_item.service';
import { SKU } from '@modules/sku/entites/sku.entity';
import { UserOrderFacade } from '@modules/customer/facade/user-order.facade';
import { PaymentProcessor } from '@modules/payment/payment.processor';
import { PaymentService } from '@modules/payment/payment.service';
import { SKUService } from '@modules/sku/service/sku.service';
import { CreditCardPaymentStrategy } from '@modules/payment/payment-strategy/credit-card-payment.strategy';
import { BankTransferPaymentStrategy } from '@modules/payment/payment-strategy/bank-transfer-payment.strategy';
import { IAddress } from '@shared/interface/address';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,

    private readonly orderStatusService: OrderStatusService,
    private readonly orderItemService: OrderItemService,
  ) {}

  async findAll() {
    return await this.orderRepository.find();
  }

  async findById(id: number) {
    return await this.orderRepository.findOne({ where: { id } });
  }

  async findAllByUser(user: User) {
    return await this.orderRepository.find({
      where: {
        user: user,
      },
      relations: {
        orderItems: {
          productVariant: true,
        },
      },
    });
  }

  async isPurchased(user: User, productVariant: SKU) {
    const order = await this.orderRepository.findOne({
      where: {
        user,
        orderItems: {
          productVariant,
        },
      },
    });

    if (!order) {
      return false;
    }

    return true;
  }

  async create(
    queryRunner: QueryRunner,
    {
      date,
      user,
      shippingAddress,
      billingAddress,
      payment,
      cartItems,
    }: {
      date: Date;
      user: User;
      shippingAddress: IAddress;
      billingAddress: IAddress;
      payment: Payment;
      cartItems: CartItem[];
    },
  ) {
    const orderStatus = await this.orderStatusService.findOneByName('pending');

    if (!orderStatus) {
      throw new BadRequestException('The order status is null.');
    }

    const orderItems: OrderItem[] = [];

    for (const item of cartItems) {
      const productVariant: SKU = item.productVariant;

      let orderItem = queryRunner.manager.create(OrderItem, {
        productVariant,
        quantity: item.quantity,
        // price: productVariant.price.,
      });

      orderItems.push(orderItem);
    }

    shippingAddress.id = undefined;
    billingAddress.id = undefined;

    let order = queryRunner.manager.create(Order, {
      createdAt: date,
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
