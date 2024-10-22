import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Product } from '../product/product.entity';
@Entity()
export class PriceHistory {
  // Fields for the entity

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  price: number;

  @Column()
  createdAt: Date;

  // Relationships for the entity

  @ManyToOne(() => Product, (product) => product.priceHistory)
  product: Product;
}
