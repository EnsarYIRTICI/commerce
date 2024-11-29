import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';

import { ProductVariant } from '@modules/product/product_variant/product_variant.entity';
import { User } from '@modules/user/user.entity';

@Entity()
export class CartItem {
  // Fields for the entity

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  // Relationships for the entity

  @ManyToOne(() => User, (entity) => entity.cartItems)
  user: User;

  @ManyToOne(() => ProductVariant, (variant) => variant.cartItems)
  productVariant: ProductVariant;
}
