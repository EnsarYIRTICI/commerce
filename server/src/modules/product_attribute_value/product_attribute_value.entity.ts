import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  ManyToMany,
} from 'typeorm';
import { ProductAttribute } from '../product_attribute/product_attribute.entity';
import { ProductVariant } from '@modules/product_variant/product_variant.entity';
import { ProductVariantValueSet } from '@modules/product_variant_value_set/product_variant_value_set.entity';

@Entity()
export class ProductAttributeValue {
  // Fields for the entity

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  value: string;

  // Relationships for the entity

  @ManyToOne(
    () => ProductAttribute,
    (productAttribute) => productAttribute.values,
  )
  productAttribute: ProductAttribute;

  @OneToMany(() => ProductVariantValueSet, (valueItem) => valueItem.value)
  valueItem: ProductVariantValueSet[];
}
