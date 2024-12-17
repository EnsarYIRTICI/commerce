import { SKU } from '@modules/sku/entites/sku.entity';
import { Stock } from '@modules/inventory/entities/stock.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { QueryRunner } from 'typeorm';
import { WarehouseService } from '@modules/warehouse/service/warehouse.service';

@Injectable()
export class StockTService {
  constructor(private readonly warehouseService: WarehouseService) {}

  async nonSave(
    queryRunner: QueryRunner,
    sku: SKU,
    quantity: number,
    warehouseId: number,
  ): Promise<Stock> {
    const warehouse =
      await this.warehouseService.validateWarehouseById(warehouseId);

    let stock = await queryRunner.manager.findOne(Stock, {
      where: { sku, warehouse },
    });

    if (!stock) {
      stock = queryRunner.manager.create(Stock, { sku, warehouse });
    }

    stock.quantity = quantity;

    return stock;
  }

  async save(
    queryRunner: QueryRunner,
    sku: SKU,
    quantity: number,
    warehouseId: number,
  ): Promise<Stock> {
    const warehouse =
      await this.warehouseService.validateWarehouseById(warehouseId);

    let stock = await queryRunner.manager.findOne(Stock, {
      where: { sku, warehouse },
    });

    if (!stock) {
      stock = queryRunner.manager.create(Stock, { sku, warehouse });
    }

    stock.quantity = quantity;
    return await queryRunner.manager.save(Stock, stock);
  }

  async reduceStock(
    queryRunner: QueryRunner,
    sku: SKU,
    quantity: number,
    warehouseId: number,
  ): Promise<void> {
    const warehouse =
      await this.warehouseService.validateWarehouseById(warehouseId);

    const stock = await queryRunner.manager.findOne(Stock, {
      where: { sku, warehouse },
    });

    if (!stock || stock.quantity < quantity) {
      throw new BadRequestException('Insufficient stock');
    }

    stock.quantity -= quantity;
    await queryRunner.manager.save(Stock, stock);
  }
}
