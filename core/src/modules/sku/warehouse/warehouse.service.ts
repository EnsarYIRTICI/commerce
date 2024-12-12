import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Warehouse } from './entities/warehouse.entity';

@Injectable()
export class WarehouseService {
  constructor(
    @InjectRepository(Warehouse)
    private warehouseRepository: Repository<Warehouse>,
  ) {}

  async determineWarehouseForOrder(
    skuId: number,
    quantity: number,
    orderAddress: string,
  ): Promise<{ warehouse: Warehouse; allocatedQuantity: number }[]> {
    const warehouses = await this.warehouseRepository.find({
      relations: ['skuStocks'],
    });

    const warehousesWithStock = warehouses.filter((warehouse) =>
      warehouse.stocks.some(
        (skuStock) => skuStock.sku.id === skuId && skuStock.stock > 0,
      ),
    );

    if (warehousesWithStock.length === 0) {
      throw new NotFoundException('No stock available in any warehouse');
    }

    const nearestWarehouse = await this.selectWarehouseByLocation(orderAddress);

    if (
      !nearestWarehouse ||
      nearestWarehouse.stocks.find((skuStock) => skuStock.sku.id === skuId)
        ?.stock < quantity
    ) {
      return this.allocateStockFromMultipleWarehouses(skuId, quantity);
    }

    return [{ warehouse: nearestWarehouse, allocatedQuantity: quantity }];
  }

  async allocateStockFromMultipleWarehouses(
    skuId: number,
    quantity: number,
  ): Promise<{ warehouse: Warehouse; allocatedQuantity: number }[]> {
    const warehouses = await this.warehouseRepository.find({
      relations: ['skuStocks'],
    });
    const allocation = [];
    let remainingQuantity = quantity;

    for (const warehouse of warehouses) {
      const stock = warehouse.stocks.find(
        (skuStock) => skuStock.sku.id === skuId,
      );
      if (stock && stock.stock > 0) {
        const allocated = Math.min(stock.stock, remainingQuantity);
        allocation.push({ warehouse, allocatedQuantity: allocated });
        remainingQuantity -= allocated;

        if (remainingQuantity <= 0) break;
      }
    }

    if (remainingQuantity > 0) {
      throw new BadRequestException('Insufficient stock across all warehouses');
    }

    return allocation;
  }

  async selectWarehouseByLocation(orderAddress: string): Promise<Warehouse> {
    const warehouses = await this.warehouseRepository.find();
    const nearestWarehouse = warehouses.reduce(
      (nearest, warehouse) => {
        const distance = this.calculateDistance(
          orderAddress,
          warehouse.location,
        );
        return distance < nearest.distance ? { warehouse, distance } : nearest;
      },
      { warehouse: null, distance: Infinity },
    );

    if (!nearestWarehouse.warehouse) {
      throw new NotFoundException('No warehouses found for the given location');
    }

    return nearestWarehouse.warehouse;
  }

  async selectWarehouseByStock(
    skuId: number,
    quantity: number,
  ): Promise<Warehouse> {
    const warehouses = await this.warehouseRepository.find({
      relations: ['skuStocks'],
    });
    const availableWarehouse = warehouses.find((warehouse) => {
      const stock = warehouse.stocks.find(
        (skuStock) => skuStock.sku.id === skuId,
      );
      return stock && stock.stock >= quantity;
    });

    if (!availableWarehouse) {
      throw new NotFoundException('No warehouse with sufficient stock found');
    }

    return availableWarehouse;
  }

  private calculateDistance(address1: string, address2: string): number {
    // Dummy implementation: Replace with real distance calculation logic
    return Math.random() * 100;
  }

  async findAll(): Promise<Warehouse[]> {
    return this.warehouseRepository.find({ relations: ['skus'] });
  }

  async findOne(id: number): Promise<Warehouse> {
    const warehouse = await this.warehouseRepository.findOne({
      where: { id },
      relations: ['skus'],
    });
    if (!warehouse) {
      throw new NotFoundException(`Warehouse with ID ${id} not found`);
    }
    return warehouse;
  }

  async create(warehouseData: Partial<Warehouse>): Promise<Warehouse> {
    const warehouse = this.warehouseRepository.create(warehouseData);
    return this.warehouseRepository.save(warehouse);
  }

  async update(
    id: number,
    warehouseData: Partial<Warehouse>,
  ): Promise<Warehouse> {
    const warehouse = await this.findOne(id);
    Object.assign(warehouse, warehouseData);
    return this.warehouseRepository.save(warehouse);
  }

  async delete(id: number): Promise<void> {
    const warehouse = await this.findOne(id);
    await this.warehouseRepository.remove(warehouse);
  }
}
