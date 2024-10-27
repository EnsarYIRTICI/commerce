import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Coupon {
  // Fields for the entity

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  code: string;

  @Column()
  discountPercentage: number;

  // Relationships for the entity

  @ManyToOne(() => User, (user) => user.coupons)
  user: User;
}
