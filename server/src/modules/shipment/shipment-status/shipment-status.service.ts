import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShipmentStatus } from './shipment-status.entity';

@Injectable()
export class ShipmentStatusService {
  constructor(
    @InjectRepository(ShipmentStatus)
    private readonly shipmentStatusRepository: Repository<ShipmentStatus>,
  ) {}

  async findAll(): Promise<ShipmentStatus[]> {
    return this.shipmentStatusRepository.find();
  }

  async findOne(id: number): Promise<ShipmentStatus> {
    const status = await this.shipmentStatusRepository.findOne({
      where: { id },
    });
    if (!status) {
      throw new NotFoundException(`ShipmentStatus with ID ${id} not found`);
    }
    return status;
  }

  async create(
    shipmentStatusData: Partial<ShipmentStatus>,
  ): Promise<ShipmentStatus> {
    const shipmentStatus =
      this.shipmentStatusRepository.create(shipmentStatusData);
    return this.shipmentStatusRepository.save(shipmentStatus);
  }

  async update(
    id: number,
    shipmentStatusData: Partial<ShipmentStatus>,
  ): Promise<ShipmentStatus> {
    const shipmentStatus = await this.findOne(id);
    Object.assign(shipmentStatus, shipmentStatusData);
    return this.shipmentStatusRepository.save(shipmentStatus);
  }

  async remove(id: number): Promise<void> {
    const shipmentStatus = await this.findOne(id);
    await this.shipmentStatusRepository.remove(shipmentStatus);
  }
}
