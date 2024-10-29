import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CouponAttribute } from './coupon_attribute.entity';
import { CouponAttributeService } from './coupon_attribute.service';
import { CouponAttributeController } from './coupon_attribute.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CouponAttribute])],
  providers: [CouponAttributeService],
  controllers: [CouponAttributeController],
})
export class CouponAttributeModule {}
