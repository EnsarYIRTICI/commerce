import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Shipment } from './shipment.entity';

@Entity()
export class ShipmentStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: string;

  @OneToMany(() => Shipment, (shipment) => shipment.status)
  shipments: Shipment[];
}
