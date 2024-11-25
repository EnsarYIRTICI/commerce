import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { ProductVariant } from '@modules/product/product_variant/product_variant.entity';
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

  @ManyToOne(() => Order, (order) => order.orderItems)
  order: Order;

  @ManyToOne(() => ProductVariant, (variant) => variant.orderItems)
  productVariant: ProductVariant;
}
