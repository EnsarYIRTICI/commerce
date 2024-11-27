import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Payment } from '../payment.entity';

@Entity()
export class PaymentStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  code: string;

  @Column()
  description: string;

  @OneToMany(() => Payment, (payment) => payment.status)
  payments: Payment[];
}
