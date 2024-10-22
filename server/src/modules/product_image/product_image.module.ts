import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductImage } from './product_image.entity';
import { ProductImageService } from './product_image.service';
import { ProductImageController } from './product_image.controller';
import { MinioService } from '@database/minio/minio.service';
import { ImageProcessingService } from '@utils/image-processing.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductImage])],
  providers: [ProductImageService],
  controllers: [ProductImageController],
})
export class ProductImageModule {}
