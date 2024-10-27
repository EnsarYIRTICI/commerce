import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';

import { ProductVariant } from '@modules/product_variant/product_variant.entity';
import { Product } from '@modules/product/product.entity';
import { User } from '@modules/user/user.entity';

@Entity()
export class ProductReview {
  // Fields for the entity

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  rating: number;

  @Column()
  comment: string;

  // Relationships for the entity

  @ManyToOne(() => ProductVariant, (variant) => variant.reviews, {
    nullable: true,
  })
  productVariant: ProductVariant;

  @ManyToOne(() => User, (user) => user.reviews)
  user: User;
}
