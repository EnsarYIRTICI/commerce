
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { Order } from "../order/order.entity"; // Additional imports for related entities

@Entity()
export class AddressDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  // Fields for the entity
  
        @Column()
        country: string;

        @Column()
        region: string;
    

  // Relationships for the entity
  
        @ManyToOne(() => Order, order => order.addressDetails)
        order: Order;
    
}
