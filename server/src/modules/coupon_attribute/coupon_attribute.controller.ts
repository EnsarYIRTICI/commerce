import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { CouponAttributeService } from './coupon_attribute.service';
import { CouponAttribute } from './coupon_attribute.entity';

@Controller('coupon_attributes')
export class CouponAttributeController {
  constructor(
    private readonly couponAttributeService: CouponAttributeService,
  ) {}

  @Get()
  findAll() {
    return this.couponAttributeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.couponAttributeService.findOne(id);
  }

  @Post()
  create(@Body() coupon: CouponAttribute) {
    return this.couponAttributeService.create(coupon);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() coupon: CouponAttribute) {
    return this.couponAttributeService.update(id, coupon);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.couponAttributeService.delete(id);
  }
}
