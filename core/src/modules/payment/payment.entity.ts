import { Order } from '@modules/order/order.entity';
import { Refund } from '@modules/payment/refund/refund.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { PaymentMethod } from './payment-method/payment_method.entity';
import { PaymentStatus } from './payment-status/payment_status.entity';
import { PaymentCurrency } from './payment-currency/payment-currency.entity';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ unique: true })
  conversationId: string;

  @Column()
  amount: number;

  @Column()
  createdDate: Date;

  @ManyToOne(() => PaymentStatus, (status) => status.payments)
  status: PaymentStatus;

  @ManyToOne(() => PaymentCurrency, (currency) => currency.payments)
  currency: PaymentCurrency;

  @ManyToOne(() => PaymentMethod, (method) => method.paymentDetail)
  method: PaymentMethod;

  @OneToMany(() => Refund, (refund) => refund.payment, { cascade: true })
  refunds: Refund[];

  @ManyToOne(() => Order, (order) => order.payments)
  order: Order;
}
