import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import { Category } from './category/category.entity';
import { SKU } from '../sku/entites/sku.entity';
import { ProductOption } from '../sku/product-option/entities/product-option.entity';

@Entity()
export class Product {
  // Fields for the entity

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  slug: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  createdAt: Date;

  @Column({ nullable: true })
  updatedAt: Date;

  // Relationships for the entity

  @ManyToMany(() => Category, { cascade: true })
  @JoinTable({ name: 'product_category_set' })
  categories: Category[];

  @OneToMany(() => SKU, (entity) => entity.product)
  skus: SKU[];
}
