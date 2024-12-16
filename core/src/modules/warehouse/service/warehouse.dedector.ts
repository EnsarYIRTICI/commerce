import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Warehouse } from '../entities/warehouse.entity';
import { SKU } from '@modules/sku/entites/sku.entity';

@Injectable()
export class WarehouseDedector {
  constructor(
    @InjectRepository(Warehouse)
    private warehouseRepository: Repository<Warehouse>,
  ) {}

  async detect(sku: SKU): Promise<Warehouse | null> {
    return this.selectWarehouseByStockAndPriority(sku);
  }

  private async selectWarehouseByStockAndPriority(
    sku: SKU,
  ): Promise<Warehouse | null> {
    const warehouse = await this.warehouseRepository
      .createQueryBuilder('warehouse')
      .innerJoinAndSelect('warehouse.stocks', 'stock')
      .where('stock.skuId = :skuId', { skuId: sku.id })
      .orderBy('stock.quantity', 'DESC')
      .addOrderBy('warehouse.priority', 'ASC')
      .getOne(); // İlk sonucu getir

    return warehouse;
  }
}
