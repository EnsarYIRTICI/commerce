import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { ProductService } from './product.service';
import { CategoryCoreModule } from './category/category.core';
import { AttributeCoreModule } from '@modules/attribute/attribute.core';
import { SlugUtil } from '@shared/utils/slug.util';

@Module({
  imports: [
    AttributeCoreModule,
    CategoryCoreModule,
    TypeOrmModule.forFeature([Product]),
  ],
  providers: [ProductService, SlugUtil],
  exports: [ProductService],
})
export class ProductCoreModule {}
