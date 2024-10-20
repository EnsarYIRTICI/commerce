import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';

import { Role } from '../role/role.entity';
import { Status } from '../status/status.entity';
import { ProductReview } from '../product_review/product_review.entity';
import { Wishlist } from '../wishlist/wishlist.entity';
import { ShoppingCart } from '../shopping_cart/shopping_cart.entity';
import { Order } from '../order/order.entity';
import { Payment } from '../payment/payment.entity';
import { Address } from '../address/address.entity';
import { ActivityLog } from '../activity_log/activity_log.entity';
import { Coupon } from '../coupon/coupon.entity';
// Additional imports for related entities

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  lastname: string;

  // Fields for the entity

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  lastPasswordChange: Date;

  // Relationships for the entity

  @ManyToOne(() => Role, (role) => role.users)
  role: Role;

  @ManyToOne(() => Status, (status) => status.users)
  status: Status;

  @OneToMany(() => ProductReview, (productReview) => productReview.user)
  reviews: ProductReview[];

  @OneToMany(() => Wishlist, (wishlist) => wishlist.user)
  wishlists: Wishlist[];

  @OneToMany(() => ShoppingCart, (shoppingCart) => shoppingCart.user)
  shoppingCarts: ShoppingCart[];

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @OneToMany(() => Payment, (payment) => payment.user)
  payments: Payment[];

  @OneToMany(() => Address, (address) => address.user)
  addresses: Address[];

  @OneToMany(() => ActivityLog, (activityLog) => activityLog.user)
  activityLogs: ActivityLog[];

  @OneToMany(() => Coupon, (coupon) => coupon.user)
  coupons: Coupon[];
}
