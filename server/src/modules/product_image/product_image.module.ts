import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductImage } from './product_image.entity';
import { ProductImageService } from './product_image.service';
import { ProductImageController } from './product_image.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ProductImage])],
  providers: [ProductImageService],
  controllers: [ProductImageController],
})
export class ProductImageModule {}
