import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CouponAttributeItemService } from './coupon_attribute_item.service';
import { CouponAttributeItem } from './coupon_attribute_item.entity';

@Controller('coupon-attribute-item')
export class CouponAttributeItemController {
  constructor(
    private readonly attributeItemService: CouponAttributeItemService,
  ) {}

  @Post()
  create(@Body() createDto: Partial<CouponAttributeItem>) {
    return this.attributeItemService.create(createDto);
  }

  @Get()
  findAll() {
    return this.attributeItemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.attributeItemService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateDto: Partial<CouponAttributeItem>,
  ) {
    return this.attributeItemService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.attributeItemService.remove(id);
  }
}
