import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Shipment } from './shipment.entity';

@Entity()
export class Carrier {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Shipment, (entity) => entity.carrier)
  shipment: Shipment;
}
