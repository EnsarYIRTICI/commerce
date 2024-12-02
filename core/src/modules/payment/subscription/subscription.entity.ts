import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '@modules/user/user.entity'; // Kullanıcı ile ilişki
import { Invoice } from '@modules/payment/invoice/invoice.entity'; // Fatura ile ilişki

@Entity()
export class Subscription {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  stripeSubscriptionId: string; // Stripe Abonelik ID

  @Column()
  status: string; // Abonelik durumu: "active", "past_due", "canceled"

  @Column({ nullable: true })
  currentPeriodStart: Date; // Geçerli dönemin başlangıç tarihi

  @Column({ nullable: true })
  currentPeriodEnd: Date; // Geçerli dönemin bitiş tarihi

  @Column({ default: false })
  cancelAtPeriodEnd: boolean; // Dönem sonunda iptal edilecek mi?

  @ManyToOne(() => User, (user) => user.subscriptions)
  user: User; // Aboneliğin hangi kullanıcıya ait olduğu

  @OneToMany(() => Invoice, (invoice) => invoice.subscription)
  invoices: Invoice[]; // Abonelikten üretilen faturalar

  @CreateDateColumn()
  createdAt: Date; // Aboneliğin oluşturulma zamanı

  @UpdateDateColumn()
  updatedAt: Date; // Aboneliğin güncellenme zamanı
}
