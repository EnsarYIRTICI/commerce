import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  Unique,
} from 'typeorm';

import { ProductVariant } from '@modules/product/product_variant/product_variant.entity';
import { Product } from '@modules/product/product.entity';
import { User } from '@modules/user/user.entity';

@Entity()
@Unique(['productVariant', 'user'])
export class ProductReview {
  // Fields for the entity

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  rating: number;

  @Column()
  comment: string;

  // Relationships for the entity

  @ManyToOne(() => ProductVariant, (variant) => variant.reviews)
  productVariant: ProductVariant;

  @ManyToOne(() => User, (user) => user.reviews)
  user: User;
}
