import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CouponAttribute } from './coupon_attribute.entity';

@Injectable()
export class CouponAttributeService {
  constructor(
    @InjectRepository(CouponAttribute)
    private couponAttributeRepository: Repository<CouponAttribute>,
  ) {}

  findAll() {
    return this.couponAttributeRepository.find();
  }

  findOne(id: number) {
    return this.couponAttributeRepository.findOne({ where: { id } });
  }

  create(coupon: CouponAttribute) {
    return this.couponAttributeRepository.save(coupon);
  }

  update(id: number, coupon: CouponAttribute) {
    return this.couponAttributeRepository.update(id, coupon);
  }

  delete(id: number) {
    return this.couponAttributeRepository.delete(id);
  }
}
