import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Order } from '../order/order.entity';
import { Carrier } from '@modules/carrier/carrier.entity';

@Entity()
export class Shipment {
  // Fields for the entity

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  trackingNumber: string;

  @Column()
  shippingStatus: string;

  @Column()
  estimatedDelivery: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  shippingFee: number;

  @Column()
  freeShipping: boolean;

  // Relationships for the entity

  @ManyToOne(() => Carrier, (carrier) => carrier.shipment)
  carrier: Carrier;

  @ManyToOne(() => Order, (order) => order.shipment)
  order: Order;
}
