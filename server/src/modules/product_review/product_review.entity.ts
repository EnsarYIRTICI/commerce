
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { Product } from "../product/product.entity";
import { User } from "../user/user.entity"; // Additional imports for related entities

@Entity()
export class ProductReview {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  // Fields for the entity
  
        @Column()
        rating: number;

        @Column()
        comment: string;
        

  // Relationships for the entity
  
        @ManyToOne(() => Product, product => product.reviews)
        product: Product;

        @ManyToOne(() => User, user => user.reviews)
        user: User;
        
}
