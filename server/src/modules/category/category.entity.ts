import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';

import { Product } from '../product/product.entity';

@Entity()
@Tree('closure-table')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  description: string;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];

  @TreeChildren()
  children: Category[];

  @TreeParent()
  parent: Category;
}
