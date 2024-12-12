import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { SKU } from '../entites/sku.entity';

@Entity()
export class ProductImage {
  // Fields for the entity

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  // Relationships for the entity

  @ManyToOne(() => SKU, (variant) => variant.images)
  productVariant: SKU;
}
