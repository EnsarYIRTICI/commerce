import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { ProductVariant } from '@modules/product/product_variant/product_variant.entity';
import { Product } from '@modules/product/product.entity';

@Entity()
export class PriceHistory {
  // Fields for the entity

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  price: number;

  @Column()
  createdAt: Date;

  // Relationships for the entity

  @ManyToOne(() => ProductVariant, (variant) => variant.priceHistory, {
    nullable: true,
  })
  productVariant: ProductVariant;
}
