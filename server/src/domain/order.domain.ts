// order.domain-service.ts

import { Order } from '@modules/order/order.entity';
import { OrderItem } from '@modules/order_item/order_item.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { AddressDomain } from './address.domain';
import { ProductVariantService } from '@modules/product_variant/product_variant.service';
import { User } from '@modules/user/user.entity';
import { CreateOrderDto } from '@modules/order/dto/createOrderDto';
import { ProductVariant } from '@modules/product_variant/product_variant.entity';
import { errorMessages } from '@common/errorMessages';

@Injectable()
export class OrderDomain {
  constructor(
    private readonly addressDomain: AddressDomain,
    private readonly productVariantService: ProductVariantService,

    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private order_itemRepository: Repository<OrderItem>,
  ) {}

  async create(request: Request, createOrderDto: CreateOrderDto) {
    const user: User = request['user'];

    const orderItems: OrderItem[] = [];

    const shippingAddress = await this.addressDomain.findUserAddressesById(
      user,
      createOrderDto.shippingAddressId,
    );

    const billingAddress = createOrderDto.billingAddressId
      ? await this.addressDomain.findUserAddressesById(
          user,
          createOrderDto.billingAddressId,
        )
      : shippingAddress;

    for (const item of createOrderDto.orderItems) {
      const productVariant: ProductVariant =
        await this.productVariantService.findOne(item.productVariantId);

      let orderItem = this.order_itemRepository.create({
        productVariant: productVariant,
        quantity: item.quantity,
        price: productVariant.price,
      });

      orderItems.push(orderItem);
    }

    let order = this.orderRepository.create({
      createdAt: new Date(),
      shippingAddress,
      billingAddress,
      orderItems,
    });

    return await this.orderRepository.save(order);
  }
}
