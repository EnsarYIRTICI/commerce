import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { AttributeValue } from './attribute-value.entity';
import { AttributeType } from './attribute-type.entity';
import { ProductOption } from '@modules/sku/entites/product-option.entity';

@Entity()
export class Attribute {
  // Fields for the entity

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  // Relationships for the entity

  @ManyToOne(() => AttributeType, (entity) => entity.attribute)
  type: AttributeType;

  @OneToMany(() => AttributeValue, (attributeValue) => attributeValue.attribute)
  values: AttributeValue[];

  @OneToMany(() => ProductOption, (entity) => entity.name)
  option: ProductOption;
}
