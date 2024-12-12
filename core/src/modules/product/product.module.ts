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
import { FormDataMiddleware } from 'src/shared/middleware/formdata.middleware';
import { CategoryService } from '@modules/product/category/category.service';
import { ProductSharedModule } from './product.shared';
import { CategoryModule } from './category/category.module';

import { ProductCoreModule } from './product.core';
import { WarehouseModule } from '../sku/warehouse/warehouse.module';
import { ProductOptionModule } from '../sku/product-option/product-option.module';
import { SKUModule } from '../sku/sku.module';

@Module({
  imports: [
    ProductSharedModule,
    ProductCoreModule,
    CategoryModule,
    WarehouseModule,
    SKUModule,
  ],
  providers: [],
  controllers: [ProductController],
})
export class ProductModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(FormDataMiddleware)
      .forRoutes({ path: 'products', method: RequestMethod.POST });
  }
}
