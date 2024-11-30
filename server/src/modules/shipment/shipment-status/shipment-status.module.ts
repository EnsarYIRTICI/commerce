import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShipmentStatus } from './shipment-status.entity';
import { ShipmentStatusService } from './shipment-status.service';
import { ShipmentStatusController } from './shipment-status.controller';
import { ShipmentStatusCoreModule } from './shipment-status.core';

@Module({
  imports: [ShipmentStatusCoreModule],
  controllers: [ShipmentStatusController],
})
export class ShipmentStatusModule {}
