
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShipmentDetail } from './shipment_detail.entity';
import { ShipmentDetailService } from './shipment_detail.service';
import { ShipmentDetailController } from './shipment_detail.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ShipmentDetail])],
  providers: [ShipmentDetailService],
  controllers: [ShipmentDetailController],
})
export class ShipmentDetailModule {}
