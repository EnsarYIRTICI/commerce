import {
  BadGatewayException,
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { User } from '../user.entity';
import { ShoppingCart } from '../../shopping_cart/shopping_cart.entity';
import { ShoppingCartService } from '../../shopping_cart/shopping_cart.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServiceNotInitializedException } from 'src/exceptions/service-not-initialized.exception';
import { ProductVariantService } from '@modules/product/product_variant/product_variant.service';
import { CartItem } from '@modules/shopping_cart/cart_item/cart_item.entity';
import { CreateCartItemDto } from '@modules/shopping_cart/cart_item/dto/create_cart_item.dto';
import { CartItemService } from '@modules/shopping_cart/cart_item/cart_item.service';
import { Request } from 'express';
import { PaymentServiceFactory } from '@modules/payment/payment.service.factory';
import { AddressService } from '@modules/address/address.service';
import { CreditCardPaymentService } from '@modules/payment/credit-card-payment.service';
import { BankTransferPaymentService } from '@modules/payment/bank-transfer-payment.service';
import { PaymentService } from '@modules/payment/interface/payment.service';
import { CreateOrderDto } from '@modules/order/dto/createOrder.dto';
import { OrderService } from '@modules/order/order.service';
import { UserCartFacade } from '../user-cart/user-cart.facade';

@Injectable()
export class UserOrderFacade {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    private readonly userCartFacade: UserCartFacade,
    private readonly paymentFactory: PaymentServiceFactory,
    private readonly addressService: AddressService,
    private readonly orderService: OrderService,
  ) {}

  private user: User;

  async init(user: User) {
    this.user = user;
  }

  async getOrders() {
    this.user = await this.userRepository.findOne({
      where: {
        id: this.user.id,
      },
      relations: {
        orders: {
          orderItems: {
            productVariant: true,
          },
        },
      },
    });

    return this.user.orders;
  }

  async createOrder(ip: string, createOrderDto: CreateOrderDto) {
    const date = new Date();

    const shippingAddress = await this.addressService.validateUserAddressById(
      this.user,
      createOrderDto.shippingAddressId,
    );

    const billingAddress = createOrderDto.billingAddressId
      ? await this.addressService.validateUserAddressById(
          this.user,
          createOrderDto.billingAddressId,
        )
      : shippingAddress;

    this.userCartFacade.init(this.user);

    const cartItems = this.user.shoppingCart.items;
    if (!cartItems.length) {
      throw new BadRequestException('No item found in cart.');
    }

    const paymentService: PaymentService = createOrderDto.paymentCard
      ? (this.paymentFactory.getPaymentService(
          'CreditCard',
        ) as CreditCardPaymentService)
      : (this.paymentFactory.getPaymentService(
          'BankTransfer',
        ) as BankTransferPaymentService);

    paymentService.init({
      billingAddress: billingAddress,
      shippingAddress: shippingAddress,
      cartItems: cartItems,
      date: date,
      ip: ip,
      user: this.user,
    });

    if (paymentService instanceof CreditCardPaymentService) {
      paymentService.initCreditCard(createOrderDto.paymentCard);
    }

    return await this.orderService.create(
      date,
      this.user,
      shippingAddress,
      billingAddress,
      cartItems,
      paymentService,
    );
  }
}
