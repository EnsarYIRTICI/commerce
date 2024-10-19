
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { ShoppingCart } from "../shopping_cart/shopping_cart.entity";
import { Product } from "../product/product.entity"; // Additional imports for related entities

@Entity()
export class CartItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  // Fields for the entity
  
        @Column()
        quantity: number;
        

  // Relationships for the entity
  
        @ManyToOne(() => ShoppingCart, shoppingCart => shoppingCart.items)
        shoppingCart: ShoppingCart;

        @ManyToOne(() => Product, product => product.cartItems)
        product: Product;
        
}
