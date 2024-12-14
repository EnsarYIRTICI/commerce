import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShipmentService } from './shipment.service';

import { Shipment } from './entities/shipment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Shipment])],
  providers: [ShipmentService],
  exports: [ShipmentService],
})
export class ShipmentCoreModule {}
