import { Refund } from '@modules/payment/refund/refund.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class RefundStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  code: string;

  @Column()
  description: string;

  @OneToMany(() => Refund, (refund) => refund.status)
  refunds: Refund[];
}
