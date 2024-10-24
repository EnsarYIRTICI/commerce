import { TreeEntity } from '@entities/tree.entity';
import { Product } from '@modules/product/product.entity';
import { Entity, OneToMany } from 'typeorm';

@Entity()
export class Category extends TreeEntity {
  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
