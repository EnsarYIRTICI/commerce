
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Coupon } from './coupon.entity';

@Injectable()
export class CouponService {
  constructor(
    @InjectRepository(Coupon)
    private couponRepository: Repository<Coupon>,
  ) {}

  findAll() {
    return this.couponRepository.find();
  }

  findOne(id: number) {
    return this.couponRepository.findOne({ where: { id } });
  }

  create(coupon: Coupon) {
    return this.couponRepository.save(coupon);
  }

  update(id: number, coupon: Coupon) {
    return this.couponRepository.update(id, coupon);
  }

  delete(id: number) {
    return this.couponRepository.delete(id);
  }
}
