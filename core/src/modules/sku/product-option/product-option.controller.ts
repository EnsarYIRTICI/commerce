import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ProductOptionService } from './product-option.service';
import { ProductOption } from './entities/product-option.entity';

@Controller('product-options')
export class ProductOptionController {
  constructor(private readonly productOptionService: ProductOptionService) {}

  @Post()
  async create(@Body() data: Partial<ProductOption>): Promise<ProductOption> {
    return this.productOptionService.create(data);
  }

  @Get()
  async findAll(): Promise<ProductOption[]> {
    return this.productOptionService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ProductOption> {
    return this.productOptionService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() data: Partial<ProductOption>): Promise<ProductOption> {
    return this.productOptionService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.productOptionService.delete(id);
  }
}
