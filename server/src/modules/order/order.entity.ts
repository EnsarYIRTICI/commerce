import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';

import { User } from '../user/user.entity';
import { OrderItem } from '../order_item/order_item.entity';
import { ShipmentDetail } from '../shipment_detail/shipment_detail.entity';
import { PaymentDetail } from '../payment_detail/payment_detail.entity';
import { AddressDetail } from '../address_detail/address_detail.entity';
// Additional imports for related entities

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  // Fields for the entity

  @Column()
  totalPrice: number;

  @Column()
  status: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  // Relationships for the entity

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  items: OrderItem[];

  @OneToMany(() => ShipmentDetail, (shipmentDetail) => shipmentDetail.order)
  shipmentDetails: ShipmentDetail[];

  @OneToMany(() => PaymentDetail, (paymentDetail) => paymentDetail.order)
  paymentDetails: PaymentDetail[];

  @OneToMany(() => AddressDetail, (addressDetail) => addressDetail.order)
  addressDetails: AddressDetail[];
}
