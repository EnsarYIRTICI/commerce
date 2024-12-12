import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { WarehouseService } from './warehouse.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Warehouse } from './entities/warehouse.entity';

@ApiBearerAuth()
@ApiTags('Warehouse')
@Controller('warehouses')
export class WarehouseController {
  constructor(private readonly warehouseService: WarehouseService) {}

  @Get()
  async findAll(): Promise<Warehouse[]> {
    return this.warehouseService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Warehouse> {
    return this.warehouseService.findOne(id);
  }

  @Post()
  async create(@Body() warehouseData: Partial<Warehouse>): Promise<Warehouse> {
    return this.warehouseService.create(warehouseData);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() warehouseData: Partial<Warehouse>,
  ): Promise<Warehouse> {
    return this.warehouseService.update(id, warehouseData);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.warehouseService.delete(id);
  }
}
