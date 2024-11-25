import { Order } from '@modules/order/order.entity';
import { OrderItem } from '@modules/order_item/order_item.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';

import { ProductVariantService } from '@modules/product_variant/product_variant.service';
import { User } from '@modules/user/user.entity';
import { CreateOrderDto } from '@modules/order/dto/createOrderDto';
import { ProductVariant } from '@modules/product_variant/product_variant.entity';
import { errorMessages } from '@common/errorMessages';
import { AddressService } from '@modules/address/address.service';
import { IyzicoService } from '@modules/payment/iyzico.service';
import Iyzipay, { BasketItemTypes, PaymentRequestData } from 'iyzipay';

import { Request } from 'express';

import { v4 as uuidv4 } from 'uuid';
import { getOrderPaymentRequest } from '@utils/payment.util';

@Injectable()
export class OrderDomainService {
  constructor(
    private readonly addressService: AddressService,
    private readonly productVariantService: ProductVariantService,
    private readonly iyzicoService: IyzicoService,

    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private order_itemRepository: Repository<OrderItem>,
  ) {}

  async create(request: Request, createOrderDto: CreateOrderDto) {
    const user: User = request['user'];

    const orderItems: OrderItem[] = [];
    const basketItems = [];
    let price: number = 0;

    const shippingAddress = await this.addressService.validateUserAddressById(
      user,
      createOrderDto.shippingAddressId,
    );

    console.log(shippingAddress);

    const billingAddress = createOrderDto.billingAddressId
      ? await this.addressService.validateUserAddressById(
          user,
          createOrderDto.billingAddressId,
        )
      : shippingAddress;

    console.log(billingAddress);

    for (const item of createOrderDto.orderItems) {
      const productVariant: ProductVariant =
        await this.productVariantService.findOne(item.productVariantId);

      price = productVariant.price + price;

      basketItems.push({
        id: productVariant.id,
        name: productVariant.name,
        category1: productVariant.product.categories[0],
        category2: productVariant.product.categories[1],
        itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
        price: productVariant.price,
      });

      let orderItem = this.order_itemRepository.create({
        productVariant: productVariant,
        quantity: item.quantity,
        price: productVariant.price,
      });

      orderItems.push(orderItem);
    }

    console.log('Order Items: ', orderItems);
    console.log('Basket Items: ', basketItems);

    let order = this.orderRepository.create({
      createdAt: new Date(),
      shippingAddress,
      billingAddress,
      orderItems,
    });

    let paymentRequest: PaymentRequestData = getOrderPaymentRequest(
      request,
      user,
      createOrderDto,
      billingAddress,
      shippingAddress,
      price,
      basketItems,
    );

    const result = await this.iyzicoService.createPayment(paymentRequest);

    console.log('Payment Result: ', result);

    if (result.status === 'success') {
      return await this.orderRepository.save(order);
    } else {
      return 'Payment Failed';
    }
  }
}
