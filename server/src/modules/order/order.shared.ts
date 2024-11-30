import { ProductVariantCoreModule } from '@modules/product/product_variant/product-variant.core';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [ProductVariantCoreModule],
  providers: [],
  exports: [ProductVariantCoreModule],
})
export class OrderSharedModule {}
