import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShipmentStatus } from './shipment-status.entity';
import { ShipmentStatusService } from './shipment-status.service';
import { ShipmentStatusController } from './shipment-status.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ShipmentStatus])],
  providers: [ShipmentStatusService],
  exports: [ShipmentStatusService],
})
export class ShipmentStatusCoreModule {}
