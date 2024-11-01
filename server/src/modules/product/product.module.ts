import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ImageProcessingService } from '@utils/image-processing.service';
import { MinioService } from '@database/minio/minio.service';
import { ProductVariant } from '@modules/product_variant/product_variant.entity';
import { ProductImage } from '@modules/product_image/product_image.entity';
import { ProductVariantValueSet } from '@modules/product_variant_value_set/product_variant_value_set.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product,
      ProductVariant,
      ProductImage,
      ProductVariantValueSet,
    ]),
  ],
  providers: [ProductService, MinioService, ImageProcessingService],
  controllers: [ProductController],
})
export class ProductModule {}
