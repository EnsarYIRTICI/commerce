import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { SKU } from '../entites/sku.entity';

@Entity('price')
export class Price {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  basePrice: number; // Ana fiyat

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  discountedPrice: number; // İndirimli fiyat

  @Column({ type: 'varchar', default: 'USD' })
  currency: string; // Para birimi

  @ManyToOne(() => SKU, (variant) => variant.prices, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'product_variant_id' })
  productVariant: SKU; // Fiyat bir varyanta ait
}
