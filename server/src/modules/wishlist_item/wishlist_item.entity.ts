
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { Wishlist } from "../wishlist/wishlist.entity";
import { Product } from "../product/product.entity"; // Additional imports for related entities

@Entity()
export class WishlistItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  // Fields for the entity
  
        @Column()
        quantity: number;
        

  // Relationships for the entity
  
        @ManyToOne(() => Wishlist, wishlist => wishlist.items)
        wishlist: Wishlist;

        @ManyToOne(() => Product, product => product.wishlistItems)
        product: Product;
        
}
