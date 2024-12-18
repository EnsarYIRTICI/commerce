import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Shipment } from '../entities/shipment.entity';

@Injectable()
export class ShipmentService {
  constructor(
    @InjectRepository(Shipment)
    private shipmentRepository: Repository<Shipment>,
  ) {}

  findAll() {
    return this.shipmentRepository.find();
  }

  findOne(id: number) {
    return this.shipmentRepository.findOne({ where: { id } });
  }

  create(shipment: Shipment) {
    return this.shipmentRepository.save(shipment);
  }

  update(id: number, shipment: Shipment) {
    return this.shipmentRepository.update(id, shipment);
  }

  delete(id: number) {
    return this.shipmentRepository.delete(id);
  }
}
