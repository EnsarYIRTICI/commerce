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
import { errorMessages } from '@common/errorMessages';
import { AddressService } from '@modules/address/address.service';

import { Request } from 'express';
import { ShoppingCartService } from '@modules/shopping_cart/shopping_cart.service';
import { CartItem } from '@modules/shopping_cart/cart_item/cart_item.entity';
import { Address } from '@modules/address/address.entity';

import { v4 as uuidv4 } from 'uuid';
import { OrderStatusService } from './order_status/order_status.service';
import { PaymentService } from '@modules/payment/payment.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,

    private readonly dataSource: DataSource,
    private readonly order_statusService: OrderStatusService,
  ) {}

  findAll() {
    return this.orderRepository.find();
  }

  findOne(id: number) {
    return this.orderRepository.findOne({ where: { id } });
  }

  async create(
    date: Date,
    user: User,
    shippingAddress: Address,
    billingAddress: Address,
    cartItems: CartItem[],
    paymentService: PaymentService,
  ) {
    const queryRunner: QueryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      let amount: number = 0;

      const orderStatus =
        await this.order_statusService.findOneByName('pending');

      if (!orderStatus) {
        throw new BadRequestException('The order status is null.');
      }

      const orderItems: OrderItem[] = [];

      for (const item of cartItems) {
        const productVariant: ProductVariant = item.productVariant;

        if (productVariant.stock < 1) {
          throw new BadRequestException('The product variant is out of stock.');
        }

        productVariant.stock -= item.quantity;
        await queryRunner.manager.save(productVariant);

        amount = productVariant.price * item.quantity + amount;

        let orderItem = queryRunner.manager.create(OrderItem, {
          productVariant,
          quantity: item.quantity,
          price: productVariant.price,
        });

        orderItems.push(orderItem);
      }

      let payment = await paymentService.create(amount);

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

      order = await queryRunner.manager.save(order);

      console.log('Order -->', order);
    } catch (error) {
      await queryRunner.rollbackTransaction();

      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  update(id: number, order: Order) {
    return this.orderRepository.update(id, order);
  }

  delete(id: number) {
    return this.orderRepository.delete(id);
  }
}
