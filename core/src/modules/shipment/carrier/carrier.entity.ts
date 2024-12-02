import { Shipment } from '@modules/shipment/shipment.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Carrier {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Shipment, (entity) => entity.carrier)
  shipment: Shipment;
}
