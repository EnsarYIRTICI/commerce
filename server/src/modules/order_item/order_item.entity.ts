import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { Order } from '../order/order.entity';
import { Product } from '../product/product.entity';
import { ProductVariant } from '@modules/product_variant/product_variant.entity';

@Entity()
export class OrderItem {
  // Fields for the entity

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  quantity: number;

  @Column()
  price: number;

  // Relationships for the entity

  @ManyToOne(() => Order, (order) => order.items)
  order: Order;

  @ManyToOne(() => ProductVariant, (variant) => variant.orderItems)
  productVariant: ProductVariant;
}
