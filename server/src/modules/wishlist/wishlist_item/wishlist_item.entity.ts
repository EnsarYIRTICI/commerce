import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';

import { ProductVariant } from '@modules/product/product_variant/product_variant.entity';
import { Wishlist } from '../wishlist.entity';

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
