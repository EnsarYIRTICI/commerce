
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { User } from "../user/user.entity"; // Additional imports for related entities

@Entity()
export class Coupon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  // Fields for the entity
  
        @Column()
        code: string;

        @Column()
        discountPercentage: number;
        

  // Relationships for the entity
  
        @ManyToOne(() => User, user => user.coupons)
        user: User;
        
}
