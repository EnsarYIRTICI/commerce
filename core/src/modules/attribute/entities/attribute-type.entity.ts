import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  ManyToMany,
} from 'typeorm';
import { Attribute } from './attribute.entity';

@Entity()
export class AttributeType {
  // Fields for the entity

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  // Relationships for the entity

  @OneToMany(() => Attribute, (entity) => entity.type)
  attribute: Attribute[];
}
