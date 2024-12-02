import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { User } from '../user/user.entity';
import { WishlistItem } from './wishlist_item/wishlist_item.entity';

@Entity()
export class Wishlist {
  // Fields for the entity

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  createdAt: Date;

  // Relationships for the entity

  @OneToMany(() => WishlistItem, (wishlistItem) => wishlistItem.wishlist)
  items: WishlistItem[];

  @ManyToOne(() => User, (user) => user.wishlists)
  user: User;
}
