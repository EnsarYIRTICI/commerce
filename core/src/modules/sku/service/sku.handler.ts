import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, QueryRunner, Repository } from 'typeorm';
import { CartItem } from '@modules/cart_item/entities/cart_item.entity';
import { SKU } from '../entites/sku.entity';
import { CreateSkuDto } from '../dto/create-sku.dto';
import { ProductOption } from '../entites/product-option.entity';
import { ProductOptionValue } from '../entites/product-option-value.entity';
import { AttributeService } from '@modules/attribute/attribute.service';
import { Attribute } from '@modules/attribute/entities/attribute.entity';
import { ProductService } from '@modules/product/product.service';
import { SlugUtil } from '@shared/utils/slug.util';
import { SKUUtil } from '@shared/utils/sku.util';
import { AttributeValue } from '@modules/attribute/entities/attribute-value.entity';
import {
  AttributeFO,
  AttributeValueFOV,
} from '../interface/attribute.interface';
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

@Injectable()
export class SKUHandler {
  constructor(
    @InjectRepository(SKU)
    private readonly skuRepository: Repository<SKU>,

    private readonly priceService: PriceService,
    private readonly stockService: StockService,
    private readonly imageService: ProductImageService,

    private readonly sku: SKU,
  ) {}

  async updateBarcode(barcode: number) {
    this.sku.barcode = barcode;

    return await this.skuRepository.update(this.sku.id, this.sku);
  }

  async changePrice(updateSkuPriceDto: UpdateSkuPriceDto) {
    await this.priceService.create(
      this.sku,
      updateSkuPriceDto.price,
      updateSkuPriceDto.currencyId,
    );
  }

  async updateStock(updateSkuStockDto: UpdateSkuStockDto) {
    await this.stockService.save(
      this.sku,
      updateSkuStockDto.stock,
      updateSkuStockDto.warehouseId,
    );
  }

  async reduceStock(updateSkuStockDto: UpdateSkuStockDto) {
    await this.stockService.reduceStock(
      this.sku,
      updateSkuStockDto.stock,
      updateSkuStockDto.warehouseId,
    );
  }
}
