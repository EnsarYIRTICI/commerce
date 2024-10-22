import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { CartItem } from '../cart_item/cart_item.entity';
import { User } from '../user/user.entity';

@Entity()
export class ShoppingCart {
  // Fields for the entity

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  createdAt: Date;

  // Relationships for the entity

  @OneToMany(() => CartItem, (cartItem) => cartItem.shoppingCart)
  items: CartItem[];

  @ManyToOne(() => User, (user) => user.shoppingCarts)
  user: User;
}
