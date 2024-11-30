import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ShipmentStatusService } from './shipment-status.service';
import { ShipmentStatus } from './shipment-status.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Shipment Status')
@Controller('shipment-status')
export class ShipmentStatusController {
  constructor(private readonly shipmentStatusService: ShipmentStatusService) {}

  @Get()
  async findAll(): Promise<ShipmentStatus[]> {
    return this.shipmentStatusService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ShipmentStatus> {
    return this.shipmentStatusService.findOne(id);
  }

  @Post()
  async create(
    @Body() shipmentStatusData: Partial<ShipmentStatus>,
  ): Promise<ShipmentStatus> {
    return this.shipmentStatusService.create(shipmentStatusData);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() shipmentStatusData: Partial<ShipmentStatus>,
  ): Promise<ShipmentStatus> {
    return this.shipmentStatusService.update(id, shipmentStatusData);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.shipmentStatusService.remove(id);
  }
}
