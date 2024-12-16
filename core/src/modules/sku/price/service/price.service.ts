import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Currency } from '../entities/currency.entity';
import { SKU } from '../../entites/sku.entity';
import { Price } from '../entities/price.entity';

@Injectable()
export class PriceService {
  constructor(
    @InjectRepository(Price)
    private priceRepository: Repository<Price>,

    @InjectRepository(Currency)
    private currencyRepository: Repository<Currency>,
  ) {}

  async createNonSave(sku: SKU, basePrice: number, currencyId: number) {
    const currency = await this.validateCurrency(currencyId);

    return this.priceRepository.create({
      basePrice,
      currency,
      productVariant: sku,
    });
  }

  async create(sku: SKU, basePrice: number, currencyId: number) {
    const currency = await this.validateCurrency(currencyId);

    return await this.priceRepository.save({
      basePrice,
      currency,
      productVariant: sku,
    });
  }

  async validateCurrency(currencyId: number) {
    const currency = await this.currencyRepository.findOne({
      where: { id: currencyId },
    });
    if (!currency) {
      throw new BadRequestException('Currency Not Found');
    }

    return currency;
  }
}
