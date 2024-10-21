import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { OrderItem } from '../order_item/order_item.entity';
import { PaymentDetail } from '../payment_detail/payment_detail.entity';
import { AddressDetail } from '../address_detail/address_detail.entity';
import { ShipmentDetail } from '../shipment_detail/shipment_detail.entity';
import { OrderStatus } from '../order_status/order_status.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  orderNumber: string;

  @Column({ type: 'date' })
  createdAt: Date;

  @Column({ type: 'date', nullable: true })
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
  items: OrderItem[];

  @ManyToOne(() => AddressDetail, { nullable: false })
  @JoinColumn({ name: 'shippingAddressId' })
  shippingAddress: AddressDetail;

  @ManyToOne(() => AddressDetail, { nullable: false })
  @JoinColumn({ name: 'billingAddressId' })
  billingAddress: AddressDetail;

  @OneToMany(() => PaymentDetail, (paymentDetail) => paymentDetail.order, {
    nullable: false,
  })
  paymentDetails: PaymentDetail[];

  @OneToMany(() => ShipmentDetail, (shipmentDetail) => shipmentDetail.order, {
    nullable: false,
  })
  shipmentDetails: ShipmentDetail[];
}
