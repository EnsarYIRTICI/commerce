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
import { MinioService } from '@modules/storage/minio/minio.service';
import { Category } from '@modules/product/category/category.entity';
import { CategoryService } from '@modules/product/category/category.service';
import { CategoryModule } from './category/category.module';

import { WarehouseModule } from '../warehouse/warehouse.module';
import { SKUModule } from '../sku/sku.module';
import { SlugUtil } from '@shared/utils/slug.util';

@Module({
  imports: [CategoryModule, TypeOrmModule.forFeature([Product])],
  providers: [ProductService, SlugUtil],
  exports: [ProductService],
  controllers: [ProductController],
})
export class ProductModule {}
