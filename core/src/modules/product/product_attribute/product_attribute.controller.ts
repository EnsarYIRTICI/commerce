import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { ProductAttributeService } from './product_attribute.service';
import { ProductAttribute } from './product_attribute.entity';
import { Roles } from 'src/shared/decorators/role.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Product Attribute')
@Controller('product_attributes')
export class ProductAttributeController {
  constructor(
    private readonly product_attributeService: ProductAttributeService,
  ) {}

  @Get('/values')
  findValues() {
    return this.product_attributeService.findValues();
  }

  @Get()
  findAll() {
    return this.product_attributeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.product_attributeService.findOne(id);
  }

  @Post()
  create(@Body() product_attribute: ProductAttribute) {
    return this.product_attributeService.create(product_attribute);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() product_attribute: ProductAttribute) {
    return this.product_attributeService.update(id, product_attribute);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.product_attributeService.delete(id);
  }
}
