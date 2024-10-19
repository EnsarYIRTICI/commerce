
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { User } from "../user/user.entity";
import { WishlistItem } from "../wishlist_item/wishlist_item.entity"; // Additional imports for related entities

@Entity()
export class Wishlist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  // Fields for the entity
  
        @Column()
        title: string;
        

  // Relationships for the entity
  
        @ManyToOne(() => User, user => user.wishlists)
        user: User;

        @OneToMany(() => WishlistItem, wishlistItem => wishlistItem.wishlist)
        items: WishlistItem[];
        
}
