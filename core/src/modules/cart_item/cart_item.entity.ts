import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';

import { SKU } from '@modules/sku/entites/sku.entity';

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

  @ManyToOne(() => SKU, (variant) => variant.cartItems)
  productVariant: SKU;
}
