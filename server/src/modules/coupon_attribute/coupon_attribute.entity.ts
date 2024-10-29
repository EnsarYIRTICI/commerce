import { CouponAttributeItem } from '@modules/coupon_attribute_item/coupon_attribute_item.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CouponAttribute {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string; // Örneğin, "expirationDate", "discountRate"

  @Column()
  description: string;

  @Column()
  data_type: 'string' | 'date' | 'number' | 'boolean';

  @OneToMany(() => CouponAttributeItem, (item) => item.attribute)
  items: CouponAttributeItem[];
}
