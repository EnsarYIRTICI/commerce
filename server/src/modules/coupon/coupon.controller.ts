
import { Controller, Get, Post, Param, Body, Put, Delete } from '@nestjs/common';
import { CouponService } from './coupon.service';
import { Coupon } from './coupon.entity';

@Controller('coupons')
export class CouponController {
  constructor(private readonly couponService: CouponService) {}

  @Get()
  findAll() {
    return this.couponService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.couponService.findOne(id);
  }

  @Post()
  create(@Body() coupon: Coupon) {
    return this.couponService.create(coupon);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() coupon: Coupon) {
    return this.couponService.update(id, coupon);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.couponService.delete(id);
  }
}
