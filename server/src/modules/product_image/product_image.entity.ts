import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Product } from '../product/product.entity';
import { ProductVariant } from '@modules/product_variant/product_variant.entity';

@Entity()
export class ProductImage {
  // Fields for the entity

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  // Relationships for the entity

  @ManyToOne(() => ProductVariant, (variant) => variant.images)
  productVariant: ProductVariant;
}
