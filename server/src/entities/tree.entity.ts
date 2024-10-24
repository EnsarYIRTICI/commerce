import { Entity, Tree, TreeChildren, TreeParent } from 'typeorm';
import { StaticEntity } from './static.entity';

@Entity()
@Tree('closure-table')
export class TreeEntity extends StaticEntity {
  @TreeChildren()
  children: TreeEntity[];

  @TreeParent()
  parent: TreeEntity;
}
