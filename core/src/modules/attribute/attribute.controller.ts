import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { AttributeService } from './attribute.service';
import { Attribute } from './entities/attribute.entity';
import { Roles } from 'src/shared/decorators/role.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Attribute')
@Controller('attributes')
export class AttributeController {
  constructor(private readonly attributeService: AttributeService) {}

  @Get('/values')
  findValues() {
    return this.attributeService.findValues();
  }

  @Get()
  findAll() {
    return this.attributeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.attributeService.findOne(id);
  }

  @Post()
  create(@Body() product_attribute: Attribute) {
    return this.attributeService.create(product_attribute);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() product_attribute: Attribute) {
    return this.attributeService.update(id, product_attribute);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.attributeService.delete(id);
  }
}
