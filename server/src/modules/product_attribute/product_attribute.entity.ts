import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { ProductAttributeValue } from '../product_attribute_value/product_attribute_value.entity';

@Entity()
export class ProductAttribute {
  // Fields for the entity

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  // Relationships for the entity

  @OneToMany(
    () => ProductAttributeValue,
    (attributeValue) => attributeValue.productAttribute,
  )
  values: ProductAttributeValue[];
}
