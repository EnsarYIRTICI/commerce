import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Order } from '../order/order.entity'; // İlgili Order modelini import ediyoruz

@Entity()
export class PaymentDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  paymentType: string; // Ödeme türü (örneğin: 'Tek çekim', 'Taksit')

  @Column({ type: 'varchar', length: 255 })
  cardType: string; // Kart türü (Visa, MasterCard, vb.)

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  shippingFee: number; // Kargo ücreti

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  totalPrice: number; // Toplam tutar (ürünler + kargo)

  // Relationships for the entity
  @ManyToOne(() => Order, (order) => order.paymentDetails, { nullable: false })
  order: Order; // PaymentDetail ile Order ilişkisi
}
