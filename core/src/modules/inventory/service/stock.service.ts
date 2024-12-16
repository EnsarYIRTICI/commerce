import { SKU } from '@modules/sku/entites/sku.entity';
import { Stock } from '@modules/inventory/entities/stock.entity';
import { Warehouse } from '@modules/warehouse/entities/warehouse.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WarehouseService } from '@modules/warehouse/service/warehouse.service';

@Injectable()
export class StockService {
  constructor(
    @InjectRepository(Stock)
    private stockRepository: Repository<Stock>,

    private readonly warehouseService: WarehouseService,
  ) {}

  async nonSave(
    sku: SKU,
    quantity: number,
    warehouseId: number,
  ): Promise<Stock> {
    const warehouse = await this.validateWarehouseById(warehouseId);

    let stock = await this.stockRepository.findOne({
      where: { sku, warehouse },
    });

    if (!stock) {
      stock = this.stockRepository.create({ sku, warehouse });
    }

    stock.quantity = quantity;

    return stock;
  }

  async save(sku: SKU, quantity: number, warehouseId: number): Promise<Stock> {
    const warehouse = await this.validateWarehouseById(warehouseId);

    let stock = await this.stockRepository.findOne({
      where: { sku, warehouse },
    });

    if (!stock) {
      stock = this.stockRepository.create({ sku, warehouse });
    }

    stock.quantity = quantity;
    return await this.stockRepository.save(stock);
  }

  async reduceStock(
    sku: SKU,
    quantity: number,
    warehouseId: number,
  ): Promise<void> {
    const warehouse = await this.validateWarehouseById(warehouseId);

    const stock = await this.stockRepository.findOne({
      where: { sku, warehouse },
    });

    if (!stock || stock.quantity < quantity) {
      throw new BadRequestException('Insufficient stock');
    }

    stock.quantity -= quantity;
    await this.stockRepository.save(stock);
  }

  async validateWarehouseById(warehouseId: number) {
    const warehouse = await this.warehouseService.findById(warehouseId);
    if (!warehouse) {
      throw new BadRequestException('Warehouse not found');
    }

    return warehouse;
  }
}
