import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class StaticEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  description: string;
}
