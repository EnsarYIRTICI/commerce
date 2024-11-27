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

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number;

  @Column()
  currencyCode: string;

  @Column()
  referenceNumber: string;

  @Column()
  paymentGatewayType?: string;

  @Column()
  paymentProviderType?: string;

  @Column()
  confirmed: boolean;

  @Column()
  status: string;

  @Column()
  createdDate: Date;

  @Column()
  archivedDate?: Date;

  @ManyToOne(() => PaymentMethod, (method) => method.paymentDetail)
  paymentMethod: PaymentMethod;

  @ManyToOne(() => Order, (order) => order.paymentDetails, { nullable: false })
  order: Order;

  @OneToMany(() => Refund, (refund) => refund.payment, { cascade: true })
  refunds: Refund[];
}
