import { BadRequestException, Injectable } from '@nestjs/common';
import { QueryRunner } from 'typeorm';
import { Currency } from '../entities/currency.entity';
import { SKU } from '../../entites/sku.entity';
import { Price } from '../entities/price.entity';

@Injectable()
export class PriceTService {
  async createNonSave(
    queryRunner: QueryRunner,
    sku: SKU,
    basePrice: number,
    currencyId: number,
  ): Promise<Price> {
    const currency = await this.validateCurrency(queryRunner, currencyId);

    const price = queryRunner.manager.create(Price, {
      basePrice,
      currency,
      productVariant: sku,
    });

    return price;
  }

  async create(
    queryRunner: QueryRunner,
    sku: SKU,
    basePrice: number,
    currencyId: number,
  ): Promise<Price> {
    const currency = await this.validateCurrency(queryRunner, currencyId);

    const price = queryRunner.manager.create(Price, {
      basePrice,
      currency,
      productVariant: sku,
    });

    return await queryRunner.manager.save(Price, price);
  }

  private async validateCurrency(
    queryRunner: QueryRunner,
    currencyId: number,
  ): Promise<Currency> {
    const currency = await queryRunner.manager.findOne(Currency, {
      where: { id: currencyId },
    });

    if (!currency) {
      throw new BadRequestException('Currency Not Found');
    }

    return currency;
  }
}
