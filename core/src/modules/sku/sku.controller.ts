import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { SKUService } from './sku.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SKU } from './entites/sku.entity';

@ApiBearerAuth()
@ApiTags('SKU')
@Controller('sku')
export class SKUController {
  constructor(private readonly product_variantService: SKUService) {}

  // @Post('stok/increase')
  // async increase(@Body() { id, quantity }: { id: number; quantity: number }) {
  //   return await this.product_variantService.increaseStock(id, quantity);
  // }

  // @Post('stok/decrease')
  // async decrease(@Body() { id, quantity }: { id: number; quantity: number }) {
  //   return await this.product_variantService.decreaseStock(id, quantity);
  // }

  @Get()
  async findAll() {
    return await this.product_variantService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.product_variantService.findOne(id);
  }

  @Post()
  async create(@Body() product_variant: SKU) {
    return await this.product_variantService.create(product_variant);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() product_variant: SKU) {
    return await this.product_variantService.update(id, product_variant);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.product_variantService.delete(id);
  }
}
