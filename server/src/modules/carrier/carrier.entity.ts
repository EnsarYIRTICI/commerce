import { Shipment } from '@modules/shipment/shipment.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Carrier {
  // Fields for the entity

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string; // Carrier name (e.g., FedEx, DHL, UPS)

  @Column()
  contactNumber: string; // Customer service contact number

  @Column()
  website: string; // Carrier's website URL

  @Column()
  region: string; // Geographic region the carrier operates in

  // Relationships for the entity

  @OneToMany(() => Shipment, (entity) => entity.carrier, {
    nullable: false,
  })
  shipmentDetails: Shipment;
}
