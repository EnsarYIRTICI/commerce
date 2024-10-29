import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CouponAttributeItemService } from './coupon_attribute_item.service';
import { CouponAttributeItemController } from './coupon_attribute_item.controller';
import { CouponAttributeItem } from './coupon_attribute_item.entity';
import { Coupon } from '@modules/coupon/coupon.entity';
import { CouponAttribute } from '@modules/coupon_attribute/coupon_attribute.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CouponAttributeItem, Coupon, CouponAttribute]),
  ],
  controllers: [CouponAttributeItemController],
  providers: [CouponAttributeItemService],
  exports: [CouponAttributeItemService],
})
export class CouponAttributeItemModule {}
