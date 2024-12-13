import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  ManyToMany,
} from 'typeorm';
import { Attribute } from './attribute.entity';
import { ProductOptionValue } from '@modules/sku/entites/product-option-value.entity';

@Entity()
export class AttributeValue {
  // Fields for the entity

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: string;

  // Relationships for the entity

  @OneToMany(() => ProductOptionValue, (entity) => entity.value)
  optionValue: ProductOptionValue[];

  @ManyToOne(() => Attribute, (Attribute) => Attribute.values)
  attribute: Attribute;
}
