import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Product } from '../product/product.entity';
import { AttributeValue } from '@modules/attribute_value/attribute_value.entity';

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
  price: number;

  // Relationships for the entity

  @ManyToOne(() => Product, (product) => product.variants)
  product: Product;

  @ManyToMany(() => AttributeValue, { cascade: true })
  @JoinTable()
  attributeValues: AttributeValue[];
}
