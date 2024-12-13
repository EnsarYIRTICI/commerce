import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SKUService } from './sku.service';
import { SKUController } from './sku.controller';
import { SKUCoreModule } from './sku.core';
import { WarehouseModule } from './warehouse/warehouse.module';
import { StockCoreModule } from './stock/stock.core';
import { ProductReviewModule } from './product_review/product_review.module';
import { ProductImageModule } from './product_image/product_image.module';
import { PriceModule } from './price/price.module';

@Module({
  imports: [
    SKUCoreModule,
    WarehouseModule,
    ProductReviewModule,
    ProductImageModule,
    PriceModule,
  ],
  providers: [],
  controllers: [SKUController],
})
export class SKUModule {}
