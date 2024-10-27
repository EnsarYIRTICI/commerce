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
import { VariantAttributeValueItem } from '@modules/variant_attribute_value_item/variant_attribute_value_item.entity';

@Entity()
export class AttributeValue {
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

  @OneToMany(() => VariantAttributeValueItem, (valueItem) => valueItem.value)
  valueItem: VariantAttributeValueItem[];
}
