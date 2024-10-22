import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { ShoppingCart } from '../shopping_cart/shopping_cart.entity';
import { Product } from '../product/product.entity';

@Entity()
export class CartItem {
  // Fields for the entity

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  quantity: number;

  // Relationships for the entity

  @ManyToOne(() => ShoppingCart, (shoppingCart) => shoppingCart.items)
  shoppingCart: ShoppingCart;

  @ManyToOne(() => Product, (product) => product.cartItems)
  product: Product;
}
