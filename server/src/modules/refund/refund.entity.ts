import { Payment } from '@modules/payment/payment.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';

@Entity('refunds')
export class Refund {
  @PrimaryGeneratedColumn()
  id: number; // Sistem içindeki benzersiz ID

  @Column()
  stripeRefundId: string; // Stripe'tan dönen benzersiz iade kimliği (örneğin: "re_1JhxF2Ll35nq5e2j6x")

  @Column()
  amount: number; // İade edilen tutar (örneğin: 5000)

  @Column({ default: 'pending' })
  status: string; // Stripe refund status (örneğin: "succeeded", "failed", "canceled")

  @Column({ nullable: true })
  reason: string; // İade nedeni (örneğin: "requested_by_customer", "duplicate")

  @Column({ nullable: true })
  failureReason: string; // Eğer iade başarısız olursa neden başarısız olduğu

  @ManyToOne(() => Payment, (payment) => payment.refunds, {
    onDelete: 'CASCADE',
  })
  payment: Payment; // Hangi ödeme ile ilişkili olduğu

  @CreateDateColumn()
  createdAt: Date; // İadenin oluşturulma tarihi
}
