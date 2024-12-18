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
import { OrderStatus } from './entities/order_status.entity';
import { Payment } from '@modules/payment/payment.entity';
import { OrderItem } from './entities/order_item.entity';
import { OrderAddress } from './entities/order-address.entity';
import { Shipment } from '@modules/shipment/entities/shipment.entity';

@Entity()
export class Order {
  // Fields for the entity

  @PrimaryGeneratedColumn('uuid')
  id: number;

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

  @ManyToOne(() => OrderAddress, { cascade: true })
  @JoinColumn({ name: 'shippingAddressId' })
  shippingAddress: OrderAddress;

  @ManyToOne(() => OrderAddress, { cascade: true })
  @JoinColumn({ name: 'billingAddressId' })
  billingAddress: OrderAddress;
}
