
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { User } from "../user/user.entity"; // Additional imports for related entities

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  // Fields for the entity
  
        @Column()
        description: string;
        

  // Relationships for the entity
  
        @OneToMany(() => User, user => user.role)
        users: User[];
        
}
