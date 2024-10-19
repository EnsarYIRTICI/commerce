
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { Order } from "../order/order.entity";
import { Product } from "../product/product.entity"; // Additional imports for related entities

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  // Fields for the entity
  
        @Column()
        quantity: number;

        @Column()
        price: number;
        

  // Relationships for the entity
  
        @ManyToOne(() => Order, order => order.items)
        order: Order;

        @ManyToOne(() => Product, product => product.orderItems)
        product: Product;
        
}
