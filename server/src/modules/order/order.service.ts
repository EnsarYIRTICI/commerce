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
import { IyzicoService } from '@modules/payment/iyzico.service';
import { getBasketItem, getOrderPaymentRequest } from '@utils/payment.util';
import { PaymentRequestData } from 'iyzipay';

import { Request } from 'express';
import { PaymentService } from '@modules/payment/payment.service';
import { ShoppingCartService } from '@modules/shopping_cart/shopping_cart.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,

    private readonly dataSource: DataSource,
    private readonly addressService: AddressService,
    private readonly productVariantService: ProductVariantService,
    private readonly paymentService: PaymentService,
    private readonly shoppingCartService: ShoppingCartService,
  ) {}

  findAll() {
    return this.orderRepository.find();
  }

  findOne(id: number) {
    return this.orderRepository.findOne({ where: { id } });
  }

  async create(request: Request, createOrderDto: CreateOrderDto) {
    const queryRunner: QueryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const user: User = request['user'];

      const orderItems: OrderItem[] = [];
      const basketItems = [];

      let price: number = 0;

      const shippingAddress = await this.addressService.validateUserAddressById(
        user,
        createOrderDto.shippingAddressId,
      );

      console.log('Shipping Address: ', shippingAddress);

      const billingAddress = createOrderDto.billingAddressId
        ? await this.addressService.validateUserAddressById(
            user,
            createOrderDto.billingAddressId,
          )
        : shippingAddress;

      console.log('Billing Address: ', billingAddress);

      const shoppingCart = await this.shoppingCartService.findOneByUser(user);

      if (!shoppingCart.items.length) {
        throw new BadRequestException('No item found in cart.');
      }

      for (const item of shoppingCart.items) {
        const productVariant: ProductVariant = item.productVariant;

        if (productVariant.stock < 1) {
          throw new BadRequestException('The product variant is out of stock.');
        }

        productVariant.stock -= item.quantity;
        await queryRunner.manager.save(productVariant);

        price = productVariant.price + price;

        basketItems.push(getBasketItem(productVariant));

        const orderItem = queryRunner.manager.create(OrderItem, {
          productVariant,
          quantity: item.quantity,
          price: productVariant.price,
        });

        orderItems.push(orderItem);
      }

      console.log('Order Items: ', orderItems);
      console.log('Basket Items: ', basketItems);

      let date = new Date();

      let paymentRequest: PaymentRequestData = getOrderPaymentRequest(
        user,
        request.ip,
        createOrderDto.paymentCard,
        billingAddress,
        shippingAddress,
        price,
        basketItems,
      );

      const payment = await this.paymentService.create(paymentRequest);

      let order = queryRunner.manager.create(Order, {
        createdAt: date,
        payments: [payment],
        shippingAddress,
        billingAddress,
        orderItems,
      });

      order = await queryRunner.manager.save(order);
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
