import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Wishlist } from '../wishlist/wishlist.entity';
import { Product } from '../product/product.entity';
import { ProductVariant } from '@modules/product_variant/product_variant.entity';

@Entity()
export class WishlistItem {
  // Fields for the entity

  @PrimaryGeneratedColumn()
  id: number;

  // Relationships for the entity

  @ManyToOne(() => Wishlist, (wishlist) => wishlist.items)
  wishlist: Wishlist;

  @ManyToOne(() => ProductVariant, (variant) => variant.wishlistItems)
  productVariant: ProductVariant;
}
