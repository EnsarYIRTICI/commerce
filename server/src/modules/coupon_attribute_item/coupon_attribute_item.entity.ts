import { Coupon } from '@modules/coupon/coupon.entity';
import { CouponAttribute } from '@modules/coupon_attribute/coupon_attribute.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CouponAttributeItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Coupon, (coupon) => coupon.attributeItems)
  coupon: Coupon;

  @ManyToOne(() => CouponAttribute, (attribute) => attribute.items)
  attribute: CouponAttribute;

  @Column('varchar', { nullable: true })
  value_string: string;

  @Column('date', { nullable: true })
  value_date: Date;

  @Column('float', { nullable: true })
  value_number: number;

  @Column('boolean', { nullable: true })
  value_boolean: boolean;
}
