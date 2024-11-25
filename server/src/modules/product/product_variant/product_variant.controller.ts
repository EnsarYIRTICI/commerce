
import { Controller, Get, Post, Param, Body, Put, Delete } from '@nestjs/common';
import { ProductVariantService } from './product_variant.service';
import { ProductVariant } from './product_variant.entity';

@Controller('product_variants')
export class ProductVariantController {
  constructor(private readonly product_variantService: ProductVariantService) {}

  @Get()
  findAll() {
    return this.product_variantService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.product_variantService.findOne(id);
  }

  @Post()
  create(@Body() product_variant: ProductVariant) {
    return this.product_variantService.create(product_variant);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() product_variant: ProductVariant) {
    return this.product_variantService.update(id, product_variant);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.product_variantService.delete(id);
  }
}
