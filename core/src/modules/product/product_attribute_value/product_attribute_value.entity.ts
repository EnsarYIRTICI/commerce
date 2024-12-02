import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  ManyToMany,
} from 'typeorm';
import { ProductAttribute } from '../product_attribute/product_attribute.entity';
import { ProductVariant } from '@modules/product/product_variant/product_variant.entity';

@Entity()
export class ProductAttributeValue {
  // Fields for the entity

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: string;

  // Relationships for the entity

  @ManyToOne(
    () => ProductAttribute,
    (productAttribute) => productAttribute.values,
  )
  productAttribute: ProductAttribute;
}
