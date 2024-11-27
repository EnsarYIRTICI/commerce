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
  currencyCode?: string;

  @Column()
  referenceNumber?: string;

  @Column()
  paymentGatewayType?: string;

  @Column()
  paymentProviderType?: string;

  @Column()
  confirmed: boolean;

  @Column()
  createdDate: Date;

  @Column()
  archivedDate?: Date;

  @ManyToOne(() => PaymentStatus, (status) => status.payments, {
    nullable: false,
  })
  status: PaymentStatus;

  @ManyToOne(() => PaymentMethod, (method) => method.paymentDetail, {
    nullable: false,
  })
  paymentMethod: PaymentMethod;

  @OneToMany(() => Refund, (refund) => refund.payment, { cascade: true })
  refunds: Refund[];

  @ManyToOne(() => Order, (order) => order.payments, { nullable: false })
  order: Order;
}
