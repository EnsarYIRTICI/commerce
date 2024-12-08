import {
  BadGatewayException,
  BadRequestException,
  Injectable,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, QueryRunner, Repository } from 'typeorm';
import { ServiceNotInitializedException } from 'src/shared/exceptions/service-not-initialized.exception';
import { ProductVariantService } from '@modules/product/product_variant/product_variant.service';
import { CartItem } from '@modules/cart_item/cart_item.entity';
import { CreateCartItemDto } from '@modules/cart_item/dto/create_cart_item.dto';
import { CartItemService } from '@modules/cart_item/cart_item.service';
import { Request } from 'express';
import { PaymentProcessor } from '@modules/payment/payment.processor';
import { AddressService } from '@modules/address/address.service';
import { CreditCardPaymentStrategy } from '@modules/payment/payment-strategy/credit-card-payment.strategy';
import { CreateOrderDto } from '@modules/order/dto/createOrder.dto';
import { OrderService } from '@modules/order/order.service';
import { UserCartFacade } from '../user-cart/user-cart.facade';
import { PaymentService } from '@modules/payment/payment.service';
import { PaymentCardDto } from '@modules/payment/dto/paymentCard.dto';
import { User } from '@modules/user/user.entity';
import { ProductReviewService } from '@modules/product/product_review/product_review.service';
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class UserReviewFacade {
  constructor(
    private readonly dataSource: DataSource,
    private readonly productVariantSerivce: ProductVariantService,
    private readonly productReviewService: ProductReviewService,
    private readonly orderService: OrderService,
  ) {}

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

  async getReviews() {
    this.isInit();

    return await this.productReviewService.findAllByUser(this.user);
  }

  async createReview(createReviewDto: CreateReviewDto) {
    this.isInit();

    const variant = await this.productVariantSerivce.findOneBySlug(
      createReviewDto.slug,
    );

    if (!variant) {
      throw new BadRequestException(
        'The requested product variant does not exist',
      );
    }

    const isPurchased = await this.orderService.isPurchased(this.user, variant);

    if (!isPurchased) {
      throw new BadRequestException(
        'You can only review products that you have purchased.',
      );
    }

    return await this.productReviewService.create({
      user: this.user,
      productVariant: variant,
      ...createReviewDto,
    });
  }
}
