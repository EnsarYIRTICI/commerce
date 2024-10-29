import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  OneToOne,
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

  @Column({ nullable: true })
  updatedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  lastPasswordChange: Date;

  // Relationships for the entity

  @ManyToOne(() => Role, (role) => role.users, { nullable: false })
  role: Role;

  @ManyToOne(() => Status, (status) => status.users, { nullable: false })
  status: Status;

  @OneToOne(() => Wishlist, (wishlist) => wishlist.user)
  wishlists: Wishlist;

  @OneToOne(() => ShoppingCart, (shoppingCart) => shoppingCart.user)
  shoppingCarts: ShoppingCart;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @OneToMany(() => ProductReview, (productReview) => productReview.user)
  reviews: ProductReview[];

  @OneToMany(() => Payment, (payment) => payment.user)
  payments: Payment[];

  @OneToMany(() => Address, (address) => address.user)
  addresses: Address[];

  @OneToMany(() => ActivityLog, (activityLog) => activityLog.user)
  activityLogs: ActivityLog[];
}
