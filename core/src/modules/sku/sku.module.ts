import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SKUService } from './service/sku.service';
import { SKUController } from './controller/sku.controller';
import { ProductReviewModule } from '../review/product_review.module';
import { ProductImageModule } from './product_image/product_image.module';
import { SkuImageMiddleware } from '@shared/middleware/formdata.middleware';
import { SharpUtil } from '@shared/utils/sharp.util';
import { AttributeCoreModule } from '@modules/attribute/attribute.core';
import { SKU } from './entites/sku.entity';
import { ProductOption } from './entites/product-option.entity';
import { ProductOptionValue } from './entites/product-option-value.entity';
import { SKUUtil } from '@shared/utils/sku.util';
import { SlugUtil } from '@shared/utils/slug.util';
import { PriceModule } from './price/price.module';
import { InventoryModule } from '@modules/inventory/inventory.module';
import { ProductModule } from '@modules/product/product.module';
import { FileModule } from '@modules/file/file.module';

@Module({
  imports: [
    PriceModule,
    ProductImageModule,
    InventoryModule,
    FileModule,
    ProductReviewModule,
    AttributeCoreModule,

    TypeOrmModule.forFeature([SKU, ProductOption, ProductOptionValue]),
  ],
  providers: [SKUService, SharpUtil, SlugUtil, SKUUtil],
  controllers: [SKUController],
  exports: [SKUService],
})
export class SKUModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(SkuImageMiddleware)
      .forRoutes({ path: 'skus/image', method: RequestMethod.POST });
  }
}
