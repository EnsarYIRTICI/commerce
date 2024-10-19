
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { Product } from "../product/product.entity"; // Additional imports for related entities

@Entity()
export class ProductVariant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  // Fields for the entity
  
        @Column()
        sku: string;

        @Column()
        price: number;
        

  // Relationships for the entity
  
        @ManyToOne(() => Product, product => product.variants)
        product: Product;
        
}
