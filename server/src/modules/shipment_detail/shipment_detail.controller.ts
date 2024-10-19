
import { Controller, Get, Post, Param, Body, Put, Delete } from '@nestjs/common';
import { ShipmentDetailService } from './shipment_detail.service';
import { ShipmentDetail } from './shipment_detail.entity';

@Controller('shipment_details')
export class ShipmentDetailController {
  constructor(private readonly shipment_detailService: ShipmentDetailService) {}

  @Get()
  findAll() {
    return this.shipment_detailService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.shipment_detailService.findOne(id);
  }

  @Post()
  create(@Body() shipment_detail: ShipmentDetail) {
    return this.shipment_detailService.create(shipment_detail);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() shipment_detail: ShipmentDetail) {
    return this.shipment_detailService.update(id, shipment_detail);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.shipment_detailService.delete(id);
  }
}
