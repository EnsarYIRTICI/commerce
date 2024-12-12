import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SKU } from '../entites/sku.entity';
import { Stock } from './entities/stock.entity';

@Injectable()
export class StockService {
  constructor(
    @InjectRepository(Stock)
    private readonly stockRepository: Repository<Stock>,
  ) {}

  async reduceStock(
    skuId: number,
    warehouseId: number,
    quantity: number,
  ): Promise<void> {
    const skuStock = await this.stockRepository.findOne({
      where: { sku: { id: skuId }, warehouse: { id: warehouseId } },
    });

    if (!skuStock || skuStock.stock < quantity) {
      throw new BadRequestException('Insufficient stock');
    }

    skuStock.stock -= quantity;
    await this.stockRepository.save(skuStock);
  }
}
