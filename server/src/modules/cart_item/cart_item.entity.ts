import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { ShoppingCart } from '../shopping_cart/shopping_cart.entity';
import { Product } from '../product/product.entity';
import { ProductVariant } from '@modules/product_variant/product_variant.entity';

@Entity()
export class CartItem {
  // Fields for the entity

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  // Relationships for the entity

  @ManyToOne(() => ShoppingCart, (shoppingCart) => shoppingCart.items)
  shoppingCart: ShoppingCart;

  @ManyToOne(() => ProductVariant, (variant) => variant.cartItems)
  productVariant: ProductVariant;
}
