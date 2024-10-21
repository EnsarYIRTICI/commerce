import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Order } from '../order/order.entity';

@Entity()
export class OrderStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string; // Durum adı (örn: 'pending', 'shipped', 'delivered')

  @Column()
  description: string; // Durum açıklaması

  @OneToMany(() => Order, (order) => order.status)
  orders: Order[]; // Bu durumla ilişkili siparişler
}
