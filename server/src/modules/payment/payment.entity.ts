import { User } from '@modules/user/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Payment {
  // Fields for the entity
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  amount: number;

  @Column()
  method: string;

  // Relationships for the entity

  @ManyToOne(() => User, (user) => user.payments)
  user: User;
}
