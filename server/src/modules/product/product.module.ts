import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ImageProcessingService } from '@utils/image-processing.service';
import { MinioService } from '@database/minio/minio.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  providers: [ProductService, MinioService, ImageProcessingService],
  controllers: [ProductController],
})
export class ProductModule {}
