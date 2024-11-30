import {
  BadGatewayException,
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { User } from '../user.entity';

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
import { CreateOrderDto } from '@modules/order/dto/createOrder.dto';
import { OrderService } from '@modules/order/order.service';
import { UserCartFacade } from '../user-cart/user-cart.facade';
import { PaymentService } from '@modules/payment/payment.service';
import { WishlistService } from '@modules/wishlist/wishlist.service';

@Injectable()
export class UserWishlistFacade {
  constructor(private readonly wishlistService: WishlistService) {}

  private user: User;

  async init(user: User) {
    this.user = user;
  }

  isInit() {
    if (!this.user) {
      throw new BadRequestException(
        'Shopping cart not initialized for the user.',
      );
    }
  }

  async getLists() {
    this.isInit();

    return await this.wishlistService.findAllByUser(this.user);
  }

  async getListById(id: string) {
    this.isInit();

    return await this.wishlistService.findOneByUser(this.user, id);
  }

  async createList(name: string) {
    this.isInit();

    await this.wishlistService.create(this.user, name);
  }

  async deleteList(id: string) {
    this.isInit();

    await this.wishlistService.deleteOneByUser(this.user, id);
  }
}
