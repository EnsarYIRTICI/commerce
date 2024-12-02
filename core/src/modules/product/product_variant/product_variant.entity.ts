import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { ProductAttributeValue } from '@modules/product/product_attribute_value/product_attribute_value.entity';
import { PriceHistory } from '@modules/product/price_history/price_history.entity';
import { ProductReview } from '@modules/product/product_review/product_review.entity';
import { Product } from '@modules/product/product.entity';
import { ProductImage } from '../product_image/product_image.entity';
import { WishlistItem } from '@modules/wishlist/wishlist_item/wishlist_item.entity';
import { OrderItem } from '@modules/order/order_item/order_item.entity';
import { CartItem } from '@modules/cart_item/cart_item.entity';

@Entity()
export class ProductVariant {
  // Fields for the entity

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  slug: string;

  @Column()
  sku: string;

  @Column()
  stock: number;

  @Column()
  price: number;

  // Relationships for the entity

  @OneToMany(() => ProductImage, (productImage) => productImage.productVariant)
  images: ProductImage[];

  @ManyToMany(() => ProductAttributeValue, { cascade: true })
  @JoinTable({ name: 'product_variant_value_set' })
  attributeValues: ProductAttributeValue[];

  @OneToMany(() => PriceHistory, (priceHistory) => priceHistory.productVariant)
  priceHistory: PriceHistory[];

  @OneToMany(() => ProductReview, (review) => review.productVariant)
  reviews: ProductReview[];

  @OneToMany(() => WishlistItem, (wishlistItem) => wishlistItem.productVariant)
  wishlistItems: WishlistItem[];

  @OneToMany(() => CartItem, (cartItem) => cartItem.productVariant)
  cartItems: CartItem[];

  @OneToMany(() => OrderItem, (orderItem) => orderItem.productVariant)
  orderItems: OrderItem[];

  @ManyToOne(() => Product, (product) => product.variants)
  product: Product;
}
