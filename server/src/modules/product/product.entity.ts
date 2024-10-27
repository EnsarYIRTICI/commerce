import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  ManyToMany,
} from 'typeorm';

import { Category } from '../category/category.entity';
import { ProductVariant } from '@modules/product_variant/product_variant.entity';

@Entity()
export class Product {
  // Fields for the entity

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  createdAt: Date;

  @Column({ nullable: true })
  updatedAt: Date;

  // Relationships for the entity

  @ManyToOne(() => Category, (category) => category.products, {
    nullable: false,
  })
  category: Category;

  @OneToMany(() => ProductVariant, (productVariant) => productVariant.product, {
    nullable: false,
  })
  variants: ProductVariant[];
}
