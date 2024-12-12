import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { ProductOptionValueService } from './product-option-value.service';
import { ProductOptionValue } from './entities/product-option-value.entity';

@Controller('product-option-values')
export class ProductOptionValueController {
  constructor(
    private readonly productOptionValueService: ProductOptionValueService,
  ) {}

  @Post()
  async create(
    @Body() data: Partial<ProductOptionValue>,
  ): Promise<ProductOptionValue> {
    return this.productOptionValueService.create(data);
  }

  @Get()
  async findAll(): Promise<ProductOptionValue[]> {
    return this.productOptionValueService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ProductOptionValue> {
    return this.productOptionValueService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() data: Partial<ProductOptionValue>,
  ): Promise<ProductOptionValue> {
    return this.productOptionValueService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.productOptionValueService.delete(id);
  }
}
