import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';

import { Category } from '../category/category.entity';
import { ProductVariant } from '../product_variant/product_variant.entity';
import { ProductImage } from '../product_image/product_image.entity';
import { ProductReview } from '../product_review/product_review.entity';
import { PriceHistory } from '../price_history/price_history.entity';
import { WishlistItem } from '../wishlist_item/wishlist_item.entity';
import { CartItem } from '../cart_item/cart_item.entity';
import { OrderItem } from '../order_item/order_item.entity';
import { ActivityLog } from '../activity_log/activity_log.entity';

@Entity()
export class Product {
  // Fields for the entity

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  price: number;

  @Column()
  stock: number;

  @Column()
  createdAt: Date;

  @Column({ nullable: true })
  updatedAt: Date;

  // Relationships for the entity

  @ManyToOne(() => Category, (category) => category.products, {
    nullable: false,
  })
  category: Category;

  @OneToMany(() => ProductVariant, (productVariant) => productVariant.product)
  variants: ProductVariant[];

  @OneToMany(() => ProductImage, (productImage) => productImage.product, {
    nullable: false,
  })
  images: ProductImage[];

  @OneToMany(() => ProductReview, (productReview) => productReview.product)
  reviews: ProductReview[];

  @OneToMany(() => PriceHistory, (priceHistory) => priceHistory.product, {
    nullable: false,
  })
  priceHistory: PriceHistory[];

  @OneToMany(() => WishlistItem, (wishlistItem) => wishlistItem.product)
  wishlistItems: WishlistItem[];

  @OneToMany(() => CartItem, (cartItem) => cartItem.product)
  cartItems: CartItem[];

  @OneToMany(() => OrderItem, (orderItem) => orderItem.product)
  orderItems: OrderItem[];
}
