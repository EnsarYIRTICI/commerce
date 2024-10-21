import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Order } from '../order/order.entity'; // Additional imports for related entities

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  // Fields for the entity

  @Column()
  amount: number;

  @Column()
  method: string;

  // Relationships for the entity

  @ManyToOne(() => User, (user) => user.payments)
  user: User;
}
