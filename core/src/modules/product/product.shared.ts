import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { MinioService } from '@modules/storage/minio/minio.service';
import { ProductVariant } from '@modules/product/product_variant/product_variant.entity';
import { Category } from '@modules/product/category/category.entity';
import { ProductAttributeValue } from '@modules/product/product_attribute_value/product_attribute_value.entity';
import { FormDataMiddleware } from 'src/shared/middleware/formdata.middleware';
import { CategoryService } from '@modules/product/category/category.service';
import { ProductAttributeValueService } from '@modules/product/product_attribute_value/product_attribute_value.service';
import { ProductImage } from './product_image/product_image.entity';
import { FileModule } from '@modules/storage/file/file.module';

@Module({
  imports: [FileModule],
  exports: [FileModule],
})
export class ProductSharedModule {}
