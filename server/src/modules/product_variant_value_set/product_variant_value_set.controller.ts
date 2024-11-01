import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ProductVariantValueSetService } from './product_variant_value_set.service';
import { ProductVariantValueSet } from './product_variant_value_set.entity';

@Controller('product_variant_value_sets')
export class ProductVariantValueSetController {
  constructor(
    private readonly productVariantValueSetService: ProductVariantValueSetService,
  ) {}

  @Post()
  async create(
    @Body() data: Partial<ProductVariantValueSet>,
  ): Promise<ProductVariantValueSet> {
    return this.productVariantValueSetService.create(data);
  }

  @Get()
  async findAll(): Promise<ProductVariantValueSet[]> {
    return this.productVariantValueSetService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ProductVariantValueSet> {
    return this.productVariantValueSetService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() data: Partial<ProductVariantValueSet>,
  ): Promise<ProductVariantValueSet> {
    return this.productVariantValueSetService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.productVariantValueSetService.delete(id);
  }
}
