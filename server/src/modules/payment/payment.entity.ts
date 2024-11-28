import { Order } from '@modules/order/order.entity';
import { Refund } from '@modules/payment/refund/refund.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { PaymentMethod } from './payment_method/payment_method.entity';
import { PaymentStatus } from './payment_status/payment_status.entity';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  basketId: string;

  @Column()
  amount: number;

  @Column()
  createdDate: Date;

  @ManyToOne(() => PaymentStatus, (status) => status.payments)
  status: PaymentStatus;

  @ManyToOne(() => PaymentMethod, (method) => method.paymentDetail)
  paymentMethod: PaymentMethod;

  @OneToMany(() => Refund, (refund) => refund.payment, { cascade: true })
  refunds: Refund[];

  @ManyToOne(() => Order, (order) => order.payments)
  order: Order;
}
