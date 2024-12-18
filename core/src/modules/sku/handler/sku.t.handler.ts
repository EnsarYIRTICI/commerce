import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, QueryRunner, Repository } from 'typeorm';
import { CartItem } from '@modules/basket/entities/cart_item.entity';
import { SKU } from '../entites/sku.entity';

import { UpdateSkuDto } from '../dto/update-sku.dto';
import { PriceService } from '../price/service/price.service';
import { ProductImageService } from '../product_image/service/product_image.service';
import { UpdateSkuImageDto } from '../dto/update-sku-image.dto';
import { WarehouseDedector } from '@modules/warehouse/service/warehouse.dedector';
import { Currency } from '../price/entities/currency.entity';
import { UpdateSkuStockDto } from '../dto/update-sku-stock.dto';
import { UpdateSkuPriceDto } from '../dto/update-sku-price.dto';
import { StockService } from '@modules/inventory/service/stock.service';
import { Price } from '../price/entities/price.entity';
import { StockTService } from '@modules/inventory/service/stock.t.service';
import { ProductImageTService } from '../product_image/service/product_image.t.service';
import { PriceTService } from '../price/service/price.t.service';

@Injectable()
export class SKUTHandler {
  constructor(
    private readonly priceTService: PriceTService,
    private readonly stockTService: StockTService,
    private readonly imageTService: ProductImageTService,

    private readonly queryRunner: QueryRunner,
    private readonly sku: SKU,
  ) {}

  async saveBarcode(barcode: number) {
    await this.queryRunner.manager.update(SKU, this.sku.id, { barcode });
  }

  async saveStock(dto: UpdateSkuStockDto) {
    return await this.stockTService.save(
      this.queryRunner,
      this.sku,
      dto.stock,
      dto.warehouseId,
    );
  }

  async reduceStock(dto: UpdateSkuStockDto) {
    return await this.stockTService.reduceStock(
      this.queryRunner,
      this.sku,
      dto.stock,
      dto.warehouseId,
    );
  }

  async createPrice(dto: UpdateSkuPriceDto) {
    return await this.priceTService.create(
      this.queryRunner,
      this.sku,
      dto.price,
      dto.currencyId,
    );
  }

  async createImage(dto: UpdateSkuImageDto) {
    return await this.imageTService.create(
      this.queryRunner,
      this.sku,
      dto.image,
    );
  }
}
