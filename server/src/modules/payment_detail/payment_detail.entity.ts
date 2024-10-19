
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { Order } from "../order/order.entity"; // Additional imports for related entities

@Entity()
export class PaymentDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  // Fields for the entity
  
        @Column()
        cardNumber: string;

        @Column()
        expirationDate: Date;

        @Column()
        securityCode: string;
    

  // Relationships for the entity
  
        @ManyToOne(() => Order, order => order.paymentDetails)
        order: Order;
    
}
