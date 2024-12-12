import { Stock } from '@modules/sku/stock/entities/stock.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('warehouse')
export class Warehouse {
  // Fields for the entity

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true })
  name: string; // Depo adı

  @Column({ type: 'varchar', nullable: true })
  location: string; // Depo adresi

  @Column({ type: 'int', default: 0 })
  priority: number; // Depo öncelik seviyesi

  // Relationships for the entity

  @OneToMany(() => Stock, (stock) => stock.warehouse)
  stocks: Stock[]; // Depodaki SKU stoğu bilgileri
}
