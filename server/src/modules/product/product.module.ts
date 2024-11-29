import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { MinioService } from 'src/storage/minio/minio.service';
import { ProductVariant } from '@modules/product/product_variant/product_variant.entity';
import { Category } from '@modules/product/category/category.entity';
import { ProductAttributeValue } from '@modules/product/product_attribute_value/product_attribute_value.entity';
import { FormDataMiddleware } from 'src/middleware/formdata.middleware';
import { CategoryService } from '@modules/product/category/category.service';
import { ProductAttributeValueService } from '@modules/product/product_attribute_value/product_attribute_value.service';
import { ProductSharedModule } from './product.shared';
import { ProductVariantModule } from './product_variant/product_variant.module';
import { ProductImageModule } from './product_image/product_image.module';
import { CategoryModule } from './category/category.module';
import { PriceHistoryModule } from './price_history/price_history.module';
import { ProductReviewModule } from './product_review/product_review.module';
import { ProductAttributeModule } from './product_attribute/product_attribute.module';
import { ProductAttributeValueModule } from './product_attribute_value/product_attribute_value.module';

@Module({
  imports: [
    CategoryModule,
    PriceHistoryModule,
    ProductReviewModule,
    ProductVariantModule,
    ProductImageModule,
    ProductAttributeModule,
    ProductAttributeValueModule,
    TypeOrmModule.forFeature([Product]),
    ProductSharedModule,
  ],
  providers: [ProductService],
  controllers: [ProductController],
})
export class ProductModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(FormDataMiddleware)
      .forRoutes({ path: 'products', method: RequestMethod.POST });
  }
}
