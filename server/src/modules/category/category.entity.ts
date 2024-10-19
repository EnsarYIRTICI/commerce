
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { Product } from "../product/product.entity"; // Additional imports for related entities

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  // Fields for the entity
  
        @Column()
        description: string;
        

  // Relationships for the entity
  
        @OneToMany(() => Product, product => product.category)
        products: Product[];
        
}
