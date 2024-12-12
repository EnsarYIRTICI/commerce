import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { SKU } from '@modules/sku/entites/sku.entity';

import { Order } from '../order.entity';

@Entity()
export class OrderItem {
  // Fields for the entity

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @Column()
  price: number;

  // Relationships for the entity

  @ManyToOne(() => SKU, (variant) => variant.orderItems)
  productVariant: SKU;

  @ManyToOne(() => Order, (order) => order.orderItems)
  order: Order;
}
