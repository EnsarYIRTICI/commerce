import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Order } from '../order/order.entity';

@Entity()
export class PaymentDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  paymentType: string;

  @Column({ type: 'varchar', length: 255 })
  cardType: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  shippingFee: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  totalPrice: number;

  @ManyToOne(() => Order, (order) => order.paymentDetails, { nullable: false })
  order: Order;
}
