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
import { OrderItem } from '../order_item/order_item.entity';
import { AddressDetail } from '../address_detail/address_detail.entity';
import { OrderStatus } from '../order_status/order_status.entity';
import { Payment } from '@modules/payment/payment.entity';
import { Shipment } from '@modules/shipment/shipment.entity';

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

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, {
    nullable: false,
  })
  orderItems: OrderItem[];

  @OneToOne(() => Payment, (entity) => entity.order, {
    nullable: false,
  })
  paymentDetails: Payment[];

  @OneToOne(() => Shipment, (entity) => entity.order, {
    nullable: false,
  })
  shipmentDetails: Shipment;

  @ManyToOne(() => AddressDetail, { nullable: false })
  @JoinColumn({ name: 'shippingAddressId' })
  shippingAddress: AddressDetail;

  @ManyToOne(() => AddressDetail, { nullable: false })
  @JoinColumn({ name: 'billingAddressId' })
  billingAddress: AddressDetail;
}
