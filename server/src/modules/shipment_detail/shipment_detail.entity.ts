import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Order } from '../order/order.entity'; // Additional imports for related entities

@Entity()
export class ShipmentDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  // Fields for the entity

  @Column()
  estimatedDelivery: Date;

  // Relationships for the entity

  @ManyToOne(() => Order, (order) => order.shipmentDetails)
  order: Order;
}
