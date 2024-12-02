import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { ProductReviewService } from './product_review.service';
import { ProductReview } from './product_review.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Product Review')
@Controller('product_reviews')
export class ProductReviewController {
  constructor(private readonly product_reviewService: ProductReviewService) {}

  @Get()
  findAll() {
    return this.product_reviewService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.product_reviewService.findOne(id);
  }

  @Post()
  create(@Body() product_review: ProductReview) {
    return this.product_reviewService.create(product_review);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() product_review: ProductReview) {
    return this.product_reviewService.update(id, product_review);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.product_reviewService.delete(id);
  }
}
