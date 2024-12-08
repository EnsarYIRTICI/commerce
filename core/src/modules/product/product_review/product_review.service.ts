import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductReview } from './product_review.entity';
import { User } from '@modules/user/user.entity';
import { ProductVariant } from '../product_variant/product_variant.entity';

@Injectable()
export class ProductReviewService {
  constructor(
    @InjectRepository(ProductReview)
    private product_reviewRepository: Repository<ProductReview>,
  ) {}

  async findAllByUser(user: User) {
    return await this.product_reviewRepository.find({
      where: {
        user: {
          id: user.id,
        },
      },
      relations: {
        productVariant: true,
      },
    });
  }

  findAll() {
    return this.product_reviewRepository.find();
  }

  findOne(id: number) {
    return this.product_reviewRepository.findOne({ where: { id } });
  }

  async create({
    user,
    productVariant,
    comment,
    rating,
  }: {
    user: User;
    productVariant: ProductVariant;
    comment: string;
    rating: number;
  }) {
    return await this.product_reviewRepository.save({
      user,
      productVariant,
      comment,
      rating,
    });
  }

  update(id: number, product_review: ProductReview) {
    return this.product_reviewRepository.update(id, product_review);
  }

  delete(id: number) {
    return this.product_reviewRepository.delete(id);
  }
}
