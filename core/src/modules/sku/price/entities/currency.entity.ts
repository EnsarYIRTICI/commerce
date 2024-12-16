import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Price } from './price.entity';

@Entity()
export class Currency {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 10, unique: true })
  name: string; // Para birimi kodu (örn: USD, EUR)

  @Column({ nullable: true })
  description: string;

  @OneToMany(() => Price, (price) => price.currency)
  prices: Price[];
}
