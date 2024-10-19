
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductReview } from './product_review.entity';

@Injectable()
export class ProductReviewService {
  constructor(
    @InjectRepository(ProductReview)
    private product_reviewRepository: Repository<ProductReview>,
  ) {}

  findAll() {
    return this.product_reviewRepository.find();
  }

  findOne(id: number) {
    return this.product_reviewRepository.findOne({ where: { id } });
  }

  create(product_review: ProductReview) {
    return this.product_reviewRepository.save(product_review);
  }

  update(id: number, product_review: ProductReview) {
    return this.product_reviewRepository.update(id, product_review);
  }

  delete(id: number) {
    return this.product_reviewRepository.delete(id);
  }
}
