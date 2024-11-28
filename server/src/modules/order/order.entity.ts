import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { User } from '../user/user.entity';
import { OrderStatus } from './order_status/order_status.entity';
import { Payment } from '@modules/payment/payment.entity';
import { Shipment } from '@modules/shipment/shipment.entity';
import { OrderItem } from './order_item/order_item.entity';
import { AddressDetail } from './address_detail/address_detail.entity';

@Entity()
export class Order {
  // Fields for the entity

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  orderNumber: string;

  @Column()
  createdAt: Date;

  @Column({ nullable: true })
  updatedAt: Date;

  // Relationships for the entity

  @ManyToOne(() => User, (user) => user.orders, { nullable: false })
  user: User;

  @ManyToOne(() => OrderStatus, (orderStatus) => orderStatus.orders, {
    nullable: false,
  })
  status: OrderStatus;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, { cascade: true })
  orderItems: OrderItem[];

  @OneToMany(() => Payment, (entity) => entity.order, { cascade: true })
  payments: Payment[];

  @OneToOne(() => Shipment, (entity) => entity.order)
  shipment: Shipment;

  @ManyToOne(() => AddressDetail, { cascade: true })
  @JoinColumn({ name: 'shippingAddressId' })
  shippingAddress: AddressDetail;

  @ManyToOne(() => AddressDetail, { cascade: true })
  @JoinColumn({ name: 'billingAddressId' })
  billingAddress: AddressDetail;
}
