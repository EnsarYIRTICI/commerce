import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductImageService } from './service/product_image.service';
import { ProductImage } from './entities/product_image.entity';
import { ProductImageTService } from './service/product_image.t.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductImage])],
  providers: [ProductImageService, ProductImageTService],
  exports: [ProductImageService, ProductImageTService],
})
export class ProductImageModule {}
