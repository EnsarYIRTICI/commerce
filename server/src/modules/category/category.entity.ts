import { TreeEntity } from '@entities/tree.entity';
import { Product } from '@modules/product/product.entity';
import { Column, Entity, OneToMany, Tree } from 'typeorm';

@Entity()
@Tree('closure-table')
export class Category extends TreeEntity {
  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
