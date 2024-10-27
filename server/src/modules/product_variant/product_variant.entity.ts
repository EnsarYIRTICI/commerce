import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { AttributeValue } from '@modules/attribute_value/attribute_value.entity';
import { PriceHistory } from '@modules/price_history/price_history.entity';
import { ProductReview } from '@modules/product_review/product_review.entity';
import { Product } from '@modules/product/product.entity';
import { VariantAttributeValueItem } from '@modules/variant_attribute_value_item/variant_attribute_value_item.entity';
import { ProductImage } from '@modules/product_image/product_image.entity';
import { WishlistItem } from '@modules/wishlist_item/wishlist_item.entity';
import { CartItem } from '@modules/cart_item/cart_item.entity';
import { OrderItem } from '@modules/order_item/order_item.entity';

@Entity()
export class ProductVariant {
  // Fields for the entity

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  sku: string;

  @Column()
  stock: number;

  @Column()
  price: number;

  // Relationships for the entity

  @OneToMany(() => ProductImage, (productImage) => productImage.product, {
    nullable: false,
  })
  images: ProductImage[];

  @ManyToMany(
    () => VariantAttributeValueItem,
    (valueItem) => valueItem.variant,
    {
      nullable: false,
    },
  )
  attributeValues: VariantAttributeValueItem[];

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
