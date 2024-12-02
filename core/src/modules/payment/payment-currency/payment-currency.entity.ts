import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Payment } from '../payment.entity';

@Entity('payment_currency')
export class PaymentCurrency {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  code: string; // ISO 4217 standard currency code (e.g., USD, EUR)

  @Column()
  name: string; // Full name of the currency (e.g., US Dollar, Euro)

  @Column('decimal', { precision: 10, scale: 2 })
  exchangeRate: number; // Exchange rate relative to a base currency

  @OneToMany(() => Payment, (payment) => payment.currency)
  payments: Payment[];
}
