import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Currency } from './currency.entity';
import { SKU } from '@modules/sku/entites/sku.entity';

@Entity('price')
export class Price {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  basePrice: number; // Ana fiyat

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  discountedPrice: number; // İndirimli fiyat

  @ManyToOne(() => Currency, (currency) => currency.prices)
  currency: Currency;

  @ManyToOne(() => SKU, (variant) => variant.prices)
  productVariant: SKU;
}
