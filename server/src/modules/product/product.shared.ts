import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { MinioService } from 'src/services/minio.service';
import { ProductVariant } from '@modules/product_variant/product_variant.entity';
import { ProductImage } from '@modules/product_image/product_image.entity';
import { Category } from '@modules/category/category.entity';
import { ProductAttributeValue } from '@modules/product_attribute_value/product_attribute_value.entity';
import { FormDataMiddleware } from 'src/middleware/formdata.middleware';
import { CategoryService } from '@modules/category/category.service';
import { ProductAttributeValueService } from '@modules/product_attribute_value/product_attribute_value.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Category,
      ProductVariant,
      ProductImage,
      ProductAttributeValue,
    ]),
  ],
  providers: [CategoryService, ProductAttributeValueService, MinioService],
  exports: [
    CategoryService,
    ProductAttributeValueService,
    MinioService,
    TypeOrmModule,
  ],
})
export class ProductSharedModule {}
