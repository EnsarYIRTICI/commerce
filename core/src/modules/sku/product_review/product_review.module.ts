import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductReview } from './entities/product_review.entity';
import { ProductReviewService } from './service/product_review.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductReview])],
  providers: [ProductReviewService],
  exports: [ProductReviewService],
})
export class ProductReviewModule {}
