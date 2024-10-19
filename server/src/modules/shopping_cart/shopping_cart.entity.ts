
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { CartItem } from "../cart_item/cart_item.entity";
import { User } from "../user/user.entity"; // Additional imports for related entities

@Entity()
export class ShoppingCart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  // Fields for the entity
  
        @Column()
        createdAt: Date;
        

  // Relationships for the entity
  
        @OneToMany(() => CartItem, cartItem => cartItem.shoppingCart)
        items: CartItem[];

        @ManyToOne(() => User, user => user.shoppingCarts)
        user: User;
        
}
