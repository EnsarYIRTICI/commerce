import { RefundStatus } from '@modules/payment/refund_status/refund-status.entity';
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
  iyzicoRefundId: string; // Iyzico'dan dönen benzersiz iade kimliği (örneğin: "123456789")

  @Column()
  amount: number; // İade edilen tutar (örneğin: 5000)

  @Column({ nullable: true })
  reason: string; // İade nedeni (örneğin: "requested_by_customer", "duplicate")

  @Column({ nullable: true })
  failureReason: string; // Eğer iade başarısız olursa neden başarısız olduğu

  @ManyToOne(() => Payment, (payment) => payment.refunds, {
    onDelete: 'CASCADE',
  })
  payment: Payment; // Hangi ödeme ile ilişkili olduğu

  @ManyToOne(() => RefundStatus, (status) => status.refunds, {
    nullable: false,
  })
  status: RefundStatus; // İade durumu (örneğin: "pending", "succeeded", "failed")

  @CreateDateColumn()
  createdAt: Date; // İadenin oluşturulma tarihi
}
