import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Order } from '../order/order.entity';

@Entity()
export class AddressDetail {
  // Fields for the entity

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string; // Adresin adı (örneğin, "Home", "Work" gibi)

  @Column()
  country: string; // Ülke

  @Column()
  region: string; // Bölge (örneğin, eyalet veya il)

  @Column()
  city: string; // Şehir

  @Column()
  postalCode: string; // Posta kodu

  @Column()
  addressLine1: string; // Adres satırı 1

  @Column({ nullable: true })
  addressLine2: string; // Adres satırı 2 (Opsiyonel)

  // Relationships for the entity

  @OneToMany(() => Order, (order) => order.billingAddress)
  billingOrders: Order[]; // Fatura adresi olarak kullanılan siparişler

  @OneToMany(() => Order, (order) => order.shippingAddress)
  shippingOrders: Order[]; // Teslimat adresi olarak kullanılan siparişler
}
