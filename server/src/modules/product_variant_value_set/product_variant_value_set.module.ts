import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductVariantValueSet } from './product_variant_value_set.entity';
import { ProductVariantValueSetService } from './product_variant_value_set.service';
import { ProductVariantValueSetController } from './product_variant_value_set.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ProductVariantValueSet])],
  providers: [ProductVariantValueSetService],
  controllers: [ProductVariantValueSetController],
  exports: [ProductVariantValueSetService],
})
export class ProductVariantValueSetModule {}
