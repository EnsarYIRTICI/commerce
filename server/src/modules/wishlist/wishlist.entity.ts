import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { User } from '../user/user.entity';
import { WishlistItem } from '../wishlist_item/wishlist_item.entity';

@Entity()
export class Wishlist {
  // Fields for the entity

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  title: string;

  // Relationships for the entity

  @ManyToOne(() => User, (user) => user.wishlists)
  user: User;

  @OneToMany(() => WishlistItem, (wishlistItem) => wishlistItem.wishlist)
  items: WishlistItem[];
}
