import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { VariantAttributeValueItemService } from './variant_attribute_value_item.service';
import { VariantAttributeValueItem } from './variant_attribute_value_item.entity';

@Controller('variant-attribute-value-item')
export class VariantAttributeValueItemController {
  constructor(
    private readonly variantAttributeValueItemService: VariantAttributeValueItemService,
  ) {}

  @Post()
  async create(
    @Body() data: Partial<VariantAttributeValueItem>,
  ): Promise<VariantAttributeValueItem> {
    return this.variantAttributeValueItemService.create(data);
  }

  @Get()
  async findAll(): Promise<VariantAttributeValueItem[]> {
    return this.variantAttributeValueItemService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<VariantAttributeValueItem> {
    return this.variantAttributeValueItemService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() data: Partial<VariantAttributeValueItem>,
  ): Promise<VariantAttributeValueItem> {
    return this.variantAttributeValueItemService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.variantAttributeValueItemService.delete(id);
  }
}
