import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { ShipmentService } from './shipment.service';
import { Shipment } from './shipment.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Shipment')
@Controller('shipments')
export class ShipmentController {
  constructor(private readonly shipmentService: ShipmentService) {}

  @Get()
  findAll() {
    return this.shipmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.shipmentService.findOne(id);
  }

  @Post()
  create(@Body() shipment: Shipment) {
    return this.shipmentService.create(shipment);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() shipment: Shipment) {
    return this.shipmentService.update(id, shipment);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.shipmentService.delete(id);
  }
}
