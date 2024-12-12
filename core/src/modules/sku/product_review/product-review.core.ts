import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductReview } from './product_review.entity';
import { ProductReviewService } from './product_review.service';
import { ProductReviewController } from './product_review.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ProductReview])],
  providers: [ProductReviewService],
  exports: [ProductReviewService],
})
export class ProductReviewCoreModule {}
