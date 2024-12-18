import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  Unique,
} from 'typeorm';

import { Product } from '@modules/product/product.entity';
import { User } from '@modules/user/user.entity';
import { SKU } from '@modules/sku/entites/sku.entity';

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

  @ManyToOne(() => SKU, (variant) => variant.reviews)
  productVariant: SKU;

  @ManyToOne(() => User, (user) => user.reviews)
  user: User;
}
