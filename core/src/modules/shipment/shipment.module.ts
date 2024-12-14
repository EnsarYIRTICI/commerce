import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShipmentService } from './shipment.service';
import { ShipmentController } from './shipment.controller';
import { ShipmentCoreModule } from './shipment.core';

@Module({
  imports: [ShipmentCoreModule],
  controllers: [ShipmentController],
})
export class ShipmentModule {}
