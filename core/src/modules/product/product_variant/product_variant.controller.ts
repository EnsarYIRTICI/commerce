import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { ProductVariantService } from './product_variant.service';
import { ProductVariant } from './product_variant.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Product Variant')
@Controller('product_variants')
export class ProductVariantController {
  constructor(private readonly product_variantService: ProductVariantService) {}

  @Post('stok/increase')
  async increase(@Body() { id, quantity }: { id: number; quantity: number }) {
    return await this.product_variantService.increaseStock(id, quantity);
  }

  @Post('stok/decrease')
  async decrease(@Body() { id, quantity }: { id: number; quantity: number }) {
    return await this.product_variantService.decreaseStock(id, quantity);
  }

  @Get()
  async findAll() {
    return await this.product_variantService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.product_variantService.findOne(id);
  }

  @Post()
  async create(@Body() product_variant: ProductVariant) {
    return await this.product_variantService.create(product_variant);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() product_variant: ProductVariant,
  ) {
    return await this.product_variantService.update(id, product_variant);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.product_variantService.delete(id);
  }
}
