import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, QueryFailedError, QueryRunner, Repository } from 'typeorm';

import { User } from '@modules/user/user.entity';

import { errorMessages } from 'src/shared/common/errorMessages';

import { UserOrderFacade } from '@modules/customer/facade/user-order.facade';
import { PaymentProcessor } from '@modules/payment/payment.processor';
import { PaymentService } from '@modules/payment/payment.service';
import { SKUService } from '@modules/sku/service/sku.service';
import { CreditCardPaymentStrategy } from '@modules/payment/payment-strategy/credit-card-payment.strategy';
import { BankTransferPaymentStrategy } from '@modules/payment/payment-strategy/bank-transfer-payment.strategy';
import { OrderService } from '@modules/order/order.service';
import { UserCartFacade } from './facade/user-cart.facade';
import { UserWishlistFacade } from './facade/user-wishlist.facade';
import { UserWishlistItemFacade } from './facade/user-wishlist-item.facade';
import { CartItemService } from '@modules/cart_item/cart_item.service';
import { WishlistService } from '@modules/wishlist/wishlist.service';
import { WishlistItemService } from '@modules/wishlist/wishlist_item/wishlist_item.service';
import { Wishlist } from '@modules/wishlist/wishlist.entity';
import { UserReviewFacade } from './facade/user-review.facade';
import { ProductReviewService } from '@modules/sku/product_review/service/product_review.service';
import { UserAddressService } from '@modules/user/address/address.service';

@Injectable()
export class UserFacadeFactory {
  constructor(
    private readonly dataSource: DataSource,

    private readonly orderService: OrderService,
    private readonly userAddressService: UserAddressService,
    private readonly paymentProcessor: PaymentProcessor,
    private readonly paymentService: PaymentService,
    private readonly creditCardPaymentStrategy: CreditCardPaymentStrategy,
    private readonly bankTransferPaymentStrategy: BankTransferPaymentStrategy,

    private readonly cartItemService: CartItemService,
    private readonly skuService: SKUService,

    private readonly wishlistService: WishlistService,
    private readonly wishlistItemService: WishlistItemService,

    private readonly productReviewService: ProductReviewService,
  ) {}

  createOrderFacade(user: User) {
    return new UserOrderFacade(
      this.dataSource,
      this.orderService,
      this.userAddressService,
      this.paymentProcessor,
      this.paymentService,
      this.creditCardPaymentStrategy,
      this.bankTransferPaymentStrategy,
      user,
    );
  }

  createReviewFacade(user: User) {
    return new UserReviewFacade(
      this.dataSource,
      this.skuService,
      this.productReviewService,
      this.orderService,
      user,
    );
  }

  createCartFacade(user: User) {
    return new UserCartFacade(this.cartItemService, this.skuService, user);
  }

  createWishlistFacade(user: User) {
    return new UserWishlistFacade(this.wishlistService, user);
  }

  createWishlistItemFacade(wishlist: Wishlist) {
    return new UserWishlistItemFacade(
      this.wishlistItemService,
      this.skuService,
      wishlist,
    );
  }
}
