import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToOne,
} from 'typeorm';
import { Product } from '@modules/product/product.entity';
import { WishlistItem } from '@modules/wishlist/wishlist_item/wishlist_item.entity';
import { OrderItem } from '@modules/order/order_item/order_item.entity';
import { CartItem } from '@modules/cart_item/cart_item.entity';
import { ProductOptionValue } from '../product-option-value/entities/product-option-value.entity';
import { ProductReview } from '../product_review/product_review.entity';
import { ProductImage } from '../product_image/product_image.entity';
import { Price } from '../price/price.entity';
import { Stock } from '../stock/entities/stock.entity';

@Entity()
export class SKU {
  // Fields for the entity

  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  slug: string;

  @Column({ unique: true, nullable: true })
  barcode: number | null;

  // Relationships for the entity

  @OneToMany(() => Stock, (entity) => entity.sku, { cascade: true })
  stocks: Stock[];

  @OneToMany(() => Price, (price) => price.productVariant, { cascade: true })
  prices: Price[];

  @OneToMany(
    () => ProductImage,
    (productImage) => productImage.productVariant,
    { cascade: true },
  )
  images: ProductImage[];

  @ManyToMany(() => ProductOptionValue, { cascade: true })
  @JoinTable({
    name: 'variant_option_value_set',
    joinColumn: { name: 'variant_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'option_value_id', referencedColumnName: 'id' },
  })
  optionValues: ProductOptionValue[];

  @OneToMany(() => ProductReview, (review) => review.productVariant)
  reviews: ProductReview[];

  @OneToMany(() => WishlistItem, (wishlistItem) => wishlistItem.productVariant)
  wishlistItems: WishlistItem[];

  @OneToMany(() => CartItem, (cartItem) => cartItem.productVariant)
  cartItems: CartItem[];

  @OneToMany(() => OrderItem, (orderItem) => orderItem.productVariant)
  orderItems: OrderItem[];

  @ManyToOne(() => Product, (product) => product.skus)
  product: Product;
}
