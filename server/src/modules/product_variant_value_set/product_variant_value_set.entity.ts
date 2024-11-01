import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { ProductVariant } from '@modules/product_variant/product_variant.entity';
import { ProductAttributeValue } from '@modules/product_attribute_value/product_attribute_value.entity';
import { Product } from '@modules/product/product.entity';

@Entity()
export class ProductVariantValueSet {
  // Fields for the entity

  @PrimaryGeneratedColumn()
  id: number;

  // Relationships for the entity

  @ManyToOne(() => ProductVariant, (variant) => variant.attributeValues)
  variant: ProductVariant;

  @ManyToOne(() => ProductAttributeValue, (value) => value.valueItem)
  value: ProductAttributeValue;
}
