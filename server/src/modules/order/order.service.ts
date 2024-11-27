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

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,

    @InjectRepository(OrderItem)
    private order_itemRepository: Repository<OrderItem>,

    private readonly addressService: AddressService,
    private readonly productVariantService: ProductVariantService,
    private readonly iyzicoService: IyzicoService,
    private readonly dataSource: DataSource,
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

      for (const item of createOrderDto.orderItems) {
        const productVariant: ProductVariant =
          await this.productVariantService.findOne(item.productVariantId);

        if (!productVariant) {
          throw new NotFoundException(
            `ProductVariant with ID ${item.productVariantId} not found.`,
          );
        }

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

      let order = queryRunner.manager.create(Order, {
        createdAt: new Date(),
        shippingAddress,
        billingAddress,
        orderItems,
      });

      let paymentRequest: PaymentRequestData = getOrderPaymentRequest(
        user,
        request.ip,
        createOrderDto.paymentCard,
        billingAddress,
        shippingAddress,
        price,
        basketItems,
      );

      const result = await this.iyzicoService.createPayment(paymentRequest);

      console.log('Payment Result: ', result);

      if (result.status === 'success') {
        order = await queryRunner.manager.save(order);

        await queryRunner.commitTransaction();

        console.log('Order: ', order);

        return order;
      } else {
        throw new BadRequestException('Payment failed.');
      }
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
