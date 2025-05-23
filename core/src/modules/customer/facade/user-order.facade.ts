import {
  BadGatewayException,
  BadRequestException,
  Injectable,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, QueryRunner, Repository } from 'typeorm';
import { ServiceNotInitializedException } from 'src/shared/exceptions/service-not-initialized.exception';
import { CartItem } from '@modules/basket/entities/cart_item.entity';
import { Request } from 'express';
import { PaymentProcessor } from '@modules/payment/payment.processor';
import { CreditCardPaymentStrategy } from '@modules/payment/payment-strategy/credit-card-payment.strategy';
import { CreateOrderDto } from '@modules/order/dto/createOrder.dto';
import { OrderService } from '@modules/order/service/order.service';
import { UserCartFacade } from './user-cart.facade';
import { PaymentService } from '@modules/payment/payment.service';
import { PaymentCardDto } from '@modules/payment/dto/paymentCard.dto';
import { User } from '@modules/user/user.entity';
import { BankTransferPaymentStrategy } from '@modules/payment/payment-strategy/bank-transfer-payment.strategy';
import { SKUService } from '@modules/sku/service/sku.service';
import { UserAddressService } from '@modules/user/address/address.service';

@Injectable()
export class UserOrderFacade {
  constructor(
    private readonly dataSource: DataSource,
    private readonly orderService: OrderService,
    private readonly userAddressService: UserAddressService,

    private readonly paymentProcessor: PaymentProcessor,
    private readonly paymentService: PaymentService,

    private readonly creditCardPaymentStrategy: CreditCardPaymentStrategy,
    private readonly bankTransferPaymentStrategy: BankTransferPaymentStrategy,

    private readonly user: User,
  ) {}

  async getOrders() {
    return await this.orderService.findAllByUser(this.user);
  }

  async createOrder(
    ip: string,
    createOrderDto: CreateOrderDto,
    cartItems: CartItem[],
    totalAmount: number,
  ) {
    if (!cartItems.length) {
      throw new BadRequestException('No item found in cart.');
    }

    const billingAddressId = createOrderDto.billingAddressId;
    const shippingAddressId = createOrderDto.shippingAddressId;

    const queryRunner: QueryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const date = new Date();

      const shippingAddress =
        await this.userAddressService.validateUserAddressById(
          this.user,
          shippingAddressId,
        );

      const billingAddress =
        billingAddressId && billingAddressId !== shippingAddressId
          ? await this.userAddressService.validateUserAddressById(
              this.user,
              billingAddressId,
            )
          : shippingAddress;

      const paymentStrategy = createOrderDto.paymentCard
        ? this.creditCardPaymentStrategy.init(createOrderDto.paymentCard)
        : this.bankTransferPaymentStrategy;

      this.paymentProcessor.init(paymentStrategy);

      const paymentResult = await this.paymentProcessor.pay(totalAmount, {
        billingAddress: billingAddress,
        shippingAddress: shippingAddress,
        cartItems: cartItems,
        date: date,
        user: this.user,
        ip: ip,
      });

      // await this.skuService.decreaseStockByCartItems(
      //   queryRunner,
      //   cartItems,
      // );

      let payment = await this.paymentService.create(queryRunner, {
        conversationId: paymentResult.conversationId,
        date: date,
        price: totalAmount,
      });

      let order = await this.orderService.create(queryRunner, {
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
