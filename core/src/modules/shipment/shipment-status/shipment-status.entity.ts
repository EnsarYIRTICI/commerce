import { Shipment } from '@modules/shipment/shipment.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class ShipmentStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: string;

  @OneToMany(() => Shipment, (shipment) => shipment.status)
  shipments: Shipment[];
}
