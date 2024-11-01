import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { ProductAttributeValueService } from './product_attribute_value.service';
import { ProductAttributeValue } from './product_attribute_value.entity';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from '@decorators/role.decorator';

@ApiBearerAuth()
@Controller('product_attribute_values')
export class ProductAttributeValueController {
  constructor(
    private readonly product_attribute_valueService: ProductAttributeValueService,
  ) {}

  @Get()
  findAll() {
    return this.product_attribute_valueService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.product_attribute_valueService.findOne(id);
  }

  @Post()
  create(@Body() product_attribute_value: ProductAttributeValue) {
    return this.product_attribute_valueService.create(product_attribute_value);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() product_attribute_value: ProductAttributeValue,
  ) {
    return this.product_attribute_valueService.update(
      id,
      product_attribute_value,
    );
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.product_attribute_valueService.delete(id);
  }
}
