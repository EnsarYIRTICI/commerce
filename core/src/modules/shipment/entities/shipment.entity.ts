import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { Carrier } from './carrier.entity';
import { ShipmentStatus } from './shipment-status.entity';
import { Order } from '@modules/order/order.entity';

@Entity()
export class Shipment {
  // Fields for the entity

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  trackingNumber: string;

  @Column()
  estimatedDelivery: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  shippingFee: number;

  // Relationships for the entity

  @ManyToOne(() => Carrier, (carrier) => carrier.shipment)
  carrier: Carrier;

  @ManyToOne(() => ShipmentStatus, (status) => status.shipments)
  status: ShipmentStatus;

  @OneToOne(() => Order, (order) => order.shipment)
  order: Order;
}
