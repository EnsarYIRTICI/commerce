
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShipmentDetail } from './shipment_detail.entity';

@Injectable()
export class ShipmentDetailService {
  constructor(
    @InjectRepository(ShipmentDetail)
    private shipment_detailRepository: Repository<ShipmentDetail>,
  ) {}

  findAll() {
    return this.shipment_detailRepository.find();
  }

  findOne(id: number) {
    return this.shipment_detailRepository.findOne({ where: { id } });
  }

  create(shipment_detail: ShipmentDetail) {
    return this.shipment_detailRepository.save(shipment_detail);
  }

  update(id: number, shipment_detail: ShipmentDetail) {
    return this.shipment_detailRepository.update(id, shipment_detail);
  }

  delete(id: number) {
    return this.shipment_detailRepository.delete(id);
  }
}
