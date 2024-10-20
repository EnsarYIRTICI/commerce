
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { Product } from "../product/product.entity"; // Additional imports for related entities

@Entity()
export class ProductImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  // Fields for the entity
  
        @Column()
        url: string;
        

  // Relationships for the entity
  
        @ManyToOne(() => Product, product => product.images)
        product: Product;
        
}