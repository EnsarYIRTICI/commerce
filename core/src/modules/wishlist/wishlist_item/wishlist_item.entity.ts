import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';

import { Wishlist } from '../wishlist.entity';
import { SKU } from '@modules/sku/entites/sku.entity';

@Entity()
export class WishlistItem {
  // Fields for the entity

  @PrimaryGeneratedColumn()
  id: number;

  // Relationships for the entity

  @ManyToOne(() => Wishlist, (wishlist) => wishlist.items)
  wishlist: Wishlist;

  @ManyToOne(() => SKU, (variant) => variant.wishlistItems)
  productVariant: SKU;
}
