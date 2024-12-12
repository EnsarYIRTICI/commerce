import { SKU } from '@modules/sku/entites/sku.entity';
import { Warehouse } from '@modules/sku/warehouse/entities/warehouse.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Index,
} from 'typeorm';

@Index(['sku', 'warehouse'])
@Entity()
export class Stock {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => SKU, (sku) => sku.stocks)
  sku: SKU;

  @ManyToOne(() => Warehouse, (warehouse) => warehouse.stocks)
  warehouse: Warehouse;

  @Column({ type: 'int', default: 0 })
  stock: number; // Bu depodaki stok miktarı

  @Column({ type: 'int', default: 0, nullable: true })
  safetyStock: number; // Güvenlik stoğu (opsiyonel)
}
