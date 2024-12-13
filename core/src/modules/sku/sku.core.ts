import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SKUService } from './sku.service';
import { SKUController } from './sku.controller';
import { SKU } from './entites/sku.entity';
import { AttributeCoreModule } from '@modules/attribute/attribute.core';
import { ProductOption } from './entites/product-option.entity';
import { ProductOptionValue } from './entites/product-option-value.entity';
import { ProductCoreModule } from '@modules/product/product.core';
import { SKUUtil } from '@shared/utils/sku.util';
import { SlugUtil } from '@shared/utils/slug.util';

@Module({
  imports: [
    ProductCoreModule,
    AttributeCoreModule,
    TypeOrmModule.forFeature([SKU, ProductOption, ProductOptionValue]),
  ],
  providers: [SKUService, SlugUtil, SKUUtil],
  exports: [SKUService],
})
export class SKUCoreModule {}
