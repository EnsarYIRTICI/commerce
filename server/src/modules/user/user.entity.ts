import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  OneToOne,
} from 'typeorm';

import { Role } from './role/role.entity';
import { Status } from './status/status.entity';
import { ProductReview } from '../product/product_review/product_review.entity';
import { Wishlist } from '../wishlist/wishlist.entity';
import { Order } from '../order/order.entity';
import { Address } from '../address/address.entity';
import { ActivityLog } from '../activity_log/activity_log.entity';
import { Subscription } from '@modules/payment/subscription/subscription.entity';
import { CartItem } from '@modules/shopping_cart/cart_item/cart_item.entity';

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

  @Column({ nullable: true })
  lastLogin: Date;

  @Column({ type: 'timestamp', nullable: true })
  lastPasswordChange: Date;

  @Column({ nullable: true })
  iyzipayId: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ nullable: true })
  identityNumber: string;

  // Relationships for the entity

  @ManyToOne(() => Role, (role) => role.users, { nullable: false })
  role: Role;

  @ManyToOne(() => Status, (status) => status.users, { nullable: false })
  status: Status;

  @OneToOne(() => Wishlist, (wishlist) => wishlist.user)
  wishlists: Wishlist;

  @OneToMany(() => CartItem, (entity) => entity.user)
  cartItems: CartItem[];

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @OneToMany(() => ProductReview, (productReview) => productReview.user)
  reviews: ProductReview[];

  @OneToMany(() => Address, (address) => address.user)
  addresses: Address[];

  @OneToMany(() => ActivityLog, (activityLog) => activityLog.user)
  activityLogs: ActivityLog[];

  @OneToMany(() => Subscription, (subscription) => subscription.user)
  subscriptions: Subscription[];
}
