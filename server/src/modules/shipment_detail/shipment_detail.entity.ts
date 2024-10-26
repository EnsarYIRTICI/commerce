import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Order } from '../order/order.entity';
@Entity()
export class ShipmentDetail {
  // Fields for the entity

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  estimatedDelivery: Date;

  // Relationships for the entity

  @ManyToOne(() => Order, (order) => order.shipmentDetails)
  order: Order;
}
