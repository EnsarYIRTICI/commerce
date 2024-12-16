import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Warehouse } from '../entities/warehouse.entity';
import { CreateWarehouseDto } from '../dto/create-warehouse.dto';

@Injectable()
export class WarehouseService {
  constructor(
    @InjectRepository(Warehouse)
    private warehouseRepository: Repository<Warehouse>,
  ) {}

  async findById(id: number): Promise<Warehouse> {
    return await this.warehouseRepository.findOne({
      where: { id },
    });
  }

  async findAll(): Promise<Warehouse[]> {
    return await this.warehouseRepository.find();
  }

  async create(createWarehouseDto: CreateWarehouseDto): Promise<Warehouse> {
    return await this.warehouseRepository.save(createWarehouseDto);
  }

  async update(
    id: number,
    warehouseData: Partial<Warehouse>,
  ): Promise<Warehouse> {
    const warehouse = await this.findById(id);
    Object.assign(warehouse, warehouseData);
    return this.warehouseRepository.save(warehouse);
  }

  async delete(id: number): Promise<void> {
    const warehouse = await this.findById(id);
    await this.warehouseRepository.remove(warehouse);
  }
}
