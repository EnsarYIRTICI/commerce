import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { AttributeValueService } from './attribute_value.service';
import { AttributeValue } from './attribute_value.entity';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from '@decorators/role.decorator';

@ApiBearerAuth()
@Controller('attribute_values')
export class AttributeValueController {
  constructor(private readonly attribute_valueService: AttributeValueService) {}

  @Get()
  findAll() {
    return this.attribute_valueService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.attribute_valueService.findOne(id);
  }

  @Post()
  create(@Body() attribute_value: AttributeValue) {
    return this.attribute_valueService.create(attribute_value);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() attribute_value: AttributeValue) {
    return this.attribute_valueService.update(id, attribute_value);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.attribute_valueService.delete(id);
  }
}
