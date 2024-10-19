import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { AttributeValue } from '../attribute_value/attribute_value.entity'; // Additional imports for related entities

@Entity()
export class ProductAttribute {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  // Relationships for the entity

  @OneToMany(
    () => AttributeValue,
    (attributeValue) => attributeValue.productAttribute,
  )
  values: AttributeValue[];
}
