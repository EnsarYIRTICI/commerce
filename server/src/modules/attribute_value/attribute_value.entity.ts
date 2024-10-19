
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { ProductAttribute } from "../product_attribute/product_attribute.entity"; // Additional imports for related entities

@Entity()
export class AttributeValue {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  // Fields for the entity
  
        @Column()
        value: string;
        

  // Relationships for the entity
  
        @ManyToOne(() => ProductAttribute, productAttribute => productAttribute.values)
        productAttribute: ProductAttribute;
        
}
