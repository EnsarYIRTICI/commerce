import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductVariant } from './product_variant.entity';
import { ProductVariantService } from './product_variant.service';
import { ProductVariantController } from './product_variant.controller';
import { ProductVariantCoreModule } from './product-variant.core';

@Module({
  imports: [ProductVariantCoreModule],
  providers: [],
  controllers: [ProductVariantController],
})
export class ProductVariantModule {}
