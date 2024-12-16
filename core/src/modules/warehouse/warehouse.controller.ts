import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Warehouse } from './entities/warehouse.entity';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { WarehouseService } from './service/warehouse.service';

@ApiBearerAuth()
@ApiTags('Warehouse')
@Controller('warehouses')
export class WarehouseController {
  constructor(private readonly warehouseService: WarehouseService) {}

  @Get()
  async findAll(): Promise<Warehouse[]> {
    return await this.warehouseService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Warehouse> {
    return await this.warehouseService.findById(id);
  }

  @Post()
  async create(
    @Body() createWarehouseDto: CreateWarehouseDto,
  ): Promise<Warehouse> {
    return await this.warehouseService.create(createWarehouseDto);
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
