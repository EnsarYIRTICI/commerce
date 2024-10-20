import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Order } from '../order/order.entity';

@Entity()
export class PaymentDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  paymentMethod: string; // Ödeme yöntemi (örneğin, 'Credit Card', 'PayPal', 'Bank Transfer')

  // Fields for payment details

  @Column()
  cardHolderName: string; // Kart sahibinin adı

  @Column()
  maskedCardNumber: string; // Kart numarasının son 4 hanesi (örneğin, '**** **** **** 1234')

  @Column({ type: 'date' })
  expirationDate: Date; // Kartın son kullanma tarihi

  @Column()
  paymentStatus: string; // Ödeme durumu ('pending', 'completed', 'failed' gibi)

  // Relationships for the entity

  @ManyToOne(() => Order, (order) => order.paymentDetails)
  order: Order;
}
