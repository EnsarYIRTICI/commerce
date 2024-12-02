import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductReview } from './product_review.entity';
import { ProductReviewService } from './product_review.service';
import { ProductReviewController } from './product_review.controller';
import { ProductReviewCoreModule } from './product-review.core';

@Module({
  imports: [ProductReviewCoreModule],
  providers: [],
  controllers: [ProductReviewController],
})
export class ProductReviewModule {}
