import {
  BadGatewayException,
  BadRequestException,
  Injectable,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { OrderService } from '@modules/order/service/order.service';
import { UserCartFacade } from './user-cart.facade';
import { PaymentService } from '@modules/payment/payment.service';
import { PaymentCardDto } from '@modules/payment/dto/paymentCard.dto';
import { User } from '@modules/user/user.entity';
import { CreateReviewDto } from '../dto/create-review.dto';
import { SKUService } from '@modules/sku/service/sku.service';
import { ProductReviewService } from '@modules/review/service/product_review.service';
import { DataSource } from 'typeorm';

@Injectable()
export class UserReviewFacade {
  constructor(
    private readonly dataSource: DataSource,
    private readonly skuService: SKUService,
    private readonly productReviewService: ProductReviewService,
    private readonly orderService: OrderService,
    private readonly user: User,
  ) {}

  async getReviews() {
    return await this.productReviewService.findAllByUser(this.user);
  }

  async createReview(createReviewDto: CreateReviewDto) {
    const variant = await this.skuService.findBySlug(createReviewDto.slug);

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
