import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Product } from '../product/product.entity';

@Entity()
export class ProductImage {
  // Fields for the entity

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  url: string;

  @Column()
  format: string;

  // Relationships for the entity

  @ManyToOne(() => Product, (product) => product.images)
  product: Product;
}
