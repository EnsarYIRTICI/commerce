import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Wishlist } from '../wishlist/wishlist.entity';
import { Product } from '../product/product.entity';

@Entity()
export class WishlistItem {
  // Fields for the entity

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  quantity: number;

  // Relationships for the entity

  @ManyToOne(() => Wishlist, (wishlist) => wishlist.items)
  wishlist: Wishlist;

  @ManyToOne(() => Product, (product) => product.wishlistItems)
  product: Product;
}
