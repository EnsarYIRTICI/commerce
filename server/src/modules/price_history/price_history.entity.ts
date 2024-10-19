
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { Product } from "../product/product.entity"; // Additional imports for related entities

@Entity()
export class PriceHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  // Fields for the entity
  
        @Column()
        price: number;

        @Column()
        changeDate: Date;
        

  // Relationships for the entity
  
        @ManyToOne(() => Product, product => product.priceHistory)
        product: Product;
        
}
