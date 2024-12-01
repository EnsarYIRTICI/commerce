import {
  BadGatewayException,
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { User } from '../user.entity';

import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, QueryRunner, Repository } from 'typeorm';
import { ServiceNotInitializedException } from 'src/shared/exceptions/service-not-initialized.exception';
import { ProductVariantService } from '@modules/product/product_variant/product_variant.service';
import { CartItem } from '@modules/shopping_cart/cart_item/cart_item.entity';
import { CreateCartItemDto } from '@modules/shopping_cart/cart_item/dto/create_cart_item.dto';
import { CartItemService } from '@modules/shopping_cart/cart_item/cart_item.service';
import { Request } from 'express';
import { PaymentProcessor } from '@modules/payment/payment.processor';
import { AddressService } from '@modules/address/address.service';
import { CreditCardPaymentStrategy } from '@modules/payment/payment-strategy/credit-card-payment.strategy';
import { CreateOrderDto } from '@modules/order/dto/createOrder.dto';
import { OrderService } from '@modules/order/order.service';
import { UserCartFacade } from '../user-cart/user-cart.facade';
import { PaymentService } from '@modules/payment/payment.service';
import { PaymentCardDto } from '@modules/payment/dto/paymentCard.dto';

@Injectable()
export class UserOrderFacade {
  constructor(
    private readonly dataSource: DataSource,

    private readonly addressService: AddressService,
    private readonly orderService: OrderService,
    private readonly productVariantService: ProductVariantService,

    private readonly paymentProcessor: PaymentProcessor,
    private readonly paymentService: PaymentService,
    private readonly creditCardPaymentStrategy: CreditCardPaymentStrategy,
  ) {}

  private user: User;

  async init(user: User) {
    this.user = user;
  }

  async getOrders() {
    return await this.orderService.findAllByUser(this.user);
  }

  async createOrder(
    ip: string,
    createOrderDto: CreateOrderDto,
    cartItems: CartItem[],
  ) {
    const billingAddressId = createOrderDto.billingAddressId;
    const shippingAddressId = createOrderDto.shippingAddressId;
    const paymentCard = createOrderDto.paymentCard;

    const queryRunner: QueryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const date = new Date();

      let amount: number = 0;

      const shippingAddress = await this.addressService.validateUserAddressById(
        this.user,
        shippingAddressId,
      );

      const billingAddress =
        billingAddressId && billingAddressId !== shippingAddressId
          ? await this.addressService.validateUserAddressById(
              this.user,
              billingAddressId,
            )
          : shippingAddress;

      this.creditCardPaymentStrategy.init(paymentCard);

      this.paymentProcessor.init(this.creditCardPaymentStrategy);

      const paymentResult = await this.paymentProcessor.pay(amount, {
        billingAddress: billingAddress,
        shippingAddress: shippingAddress,
        cartItems: cartItems,
        date: date,
        user: this.user,
        ip: ip,
      });

      await this.productVariantService.decreaseStockByCartItems(
        queryRunner,
        cartItems,
      );

      let payment = await this.paymentService.create({
        queryRunner: queryRunner,
        basketId: '',
        date: date,
        price: amount,
      });

      let order = await this.orderService.create({
        queryRunner: queryRunner,
        billingAddress: billingAddress,
        shippingAddress: shippingAddress,
        cartItems: cartItems,
        date: date,
        user: this.user,
        payment: payment,
      });

      await queryRunner.commitTransaction();

      return order;
    } catch (error) {
      await queryRunner.rollbackTransaction();

      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
