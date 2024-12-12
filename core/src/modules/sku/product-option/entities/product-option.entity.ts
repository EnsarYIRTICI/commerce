import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { ProductOptionValue } from '../../product-option-value/entities/product-option-value.entity';
import { Attribute } from '@modules/attribute/entities/attribute.entity';
import { Product } from '@modules/product/product.entity';

@Entity()
export class ProductOption {
  // Fields for the entity

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 0 })
  priority: number;

  // Relationships for the entity

  @ManyToOne(() => Attribute, (entity) => entity.option)
  name: Attribute;

  @OneToMany(() => ProductOptionValue, (value) => value.option, {
    cascade: true,
  })
  values: ProductOptionValue[];
}
