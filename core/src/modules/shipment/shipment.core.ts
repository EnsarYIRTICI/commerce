import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shipment } from './shipment.entity';
import { ShipmentService } from './shipment.service';
import { ShipmentController } from './shipment.controller';
import { CarrierModule } from './carrier/carrier.module';
import { ShipmentStatusModule } from './shipment-status/shipment-status.module';

@Module({
  imports: [
    ShipmentStatusModule,
    CarrierModule,
    TypeOrmModule.forFeature([Shipment]),
  ],
  providers: [ShipmentService],
  exports: [ShipmentService],
})
export class ShipmentCoreModule {}
