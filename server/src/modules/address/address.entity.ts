import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Address {
  // Fields for the entity

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string; // Adresin adı (örneğin, "Home", "Work" gibi)

  @Column()
  country: string; // Ülke

  @Column()
  region: string; // Bölge (örneğin, eyalet veya il)

  @Column()
  city: string; // Şehir

  @Column()
  postalCode: string; // Posta kodu

  @Column()
  addressLine1: string; // Adres satırı 1

  @Column({ nullable: true })
  addressLine2: string; // Adres satırı 2 (Opsiyonel)

  // Relationships for the entity

  @ManyToOne(() => User, (user) => user.addresses, { nullable: false })
  user: User;
}
