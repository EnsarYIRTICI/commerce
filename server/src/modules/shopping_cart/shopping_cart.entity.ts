import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { CartItem } from './cart_item/cart_item.entity';

@Entity()
export class ShoppingCart {
  // Fields for the entity

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  createdAt: Date;

  // Relationships for the entity

  @OneToMany(() => CartItem, (cartItem) => cartItem.shoppingCart)
  items: CartItem[];

  @OneToOne(() => User, (user) => user.shoppingCart)
  @JoinColumn()
  user: User;
}
