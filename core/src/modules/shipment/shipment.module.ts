import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shipment } from './shipment.entity';
import { ShipmentService } from './shipment.service';
import { ShipmentController } from './shipment.controller';
import { CarrierModule } from './carrier/carrier.module';
import { ShipmentCoreModule } from './shipment.core';

@Module({
  imports: [ShipmentCoreModule],
  controllers: [ShipmentController],
})
export class ShipmentModule {}
