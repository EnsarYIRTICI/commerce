import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Subscription } from '@modules/subscription/subscription.entity';

@Entity()
export class Invoice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  stripeInvoiceId: string; // Stripe üzerinden oluşturulan fatura ID

  @Column()
  amountDue: number; // Kullanıcıdan tahsil edilecek toplam tutar

  @Column()
  currency: string; // Para birimi (örneğin, "usd")

  @Column({ default: 'open' })
  status: string; // Fatura durumu ("paid", "open", "void")

  @Column({ nullable: true })
  description: string; // Fatura açıklaması (örneğin: "Monthly subscription")

  @CreateDateColumn()
  createdAt: Date; // Fatura oluşturulma tarihi

  @UpdateDateColumn()
  updatedAt: Date; // Fatura güncellenme tarihi

  @ManyToOne(() => Subscription, (subscription) => subscription.invoices, {
    nullable: true,
  })
  subscription: Subscription; // Abonelik ile ilişki
}
