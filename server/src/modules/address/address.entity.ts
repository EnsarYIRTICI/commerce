
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { User } from "../user/user.entity"; // Additional imports for related entities

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  // Fields for the entity
  
        @Column()
        street: string;

        @Column()
        city: string;

        @Column()
        state: string;

        @Column()
        postalCode: string;
        

  // Relationships for the entity
  
        @ManyToOne(() => User, user => user.addresses)
        user: User;
        
}
