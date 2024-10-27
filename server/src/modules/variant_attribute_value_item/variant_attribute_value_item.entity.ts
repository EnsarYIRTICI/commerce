import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { ProductVariant } from '@modules/product_variant/product_variant.entity';
import { AttributeValue } from '@modules/attribute_value/attribute_value.entity';
import { Product } from '@modules/product/product.entity';

@Entity()
export class VariantAttributeValueItem {
  // Fields for the entity

  @PrimaryGeneratedColumn()
  id: number;

  // Relationships for the entity

  @ManyToOne(() => ProductVariant, (variant) => variant.attributeValues)
  variant: ProductVariant;

  @ManyToOne(() => AttributeValue, (value) => value.valueItem)
  value: AttributeValue;
}
