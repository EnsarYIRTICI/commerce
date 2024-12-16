import { SKU } from '@modules/sku/entites/sku.entity';
import { Warehouse } from '@modules/warehouse/entities/warehouse.entity';
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

  @Column({ type: 'int', default: 0 })
  quantity: number;

  @ManyToOne(() => Warehouse, (warehouse) => warehouse.stocks)
  warehouse: Warehouse;

  @ManyToOne(() => SKU, (sku) => sku.stocks)
  sku: SKU;
}
