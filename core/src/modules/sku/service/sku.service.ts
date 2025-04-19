import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, QueryRunner, Repository } from 'typeorm';
import { CartItem } from '@modules/basket/entities/cart_item.entity';
import { SKU } from '../entites/sku.entity';
import { CreateSkuDto } from '../dto/create-sku.dto';
import { ProductOption } from '../entites/product-option.entity';
import { ProductOptionValue } from '../entites/product-option-value.entity';
import { AttributeService } from '@modules/attribute/attribute.service';
import { Attribute } from '@modules/attribute/entities/attribute.entity';
import { ProductService } from '@modules/product/service/product.service';
import { SlugUtil } from '@shared/utils/slug.util';
import { SKUUtil } from '@shared/utils/sku.util';
import { AttributeValue } from '@modules/attribute/entities/attribute-value.entity';
import {
  AttributeFO,
  AttributeValueFOV,
} from '../interface/attribute.interface';
import { UpdateSkuDto } from '../dto/update-sku.dto';
import { SKUHandler } from '../handler/sku.handler';
import { PriceService } from '../price/service/price.service';
import { StockService } from '@modules/inventory/service/stock.service';
import { ProductImageService } from '../product_image/service/product_image.service';
import { SKUTHandler } from '../handler/sku.t.handler';
import { StockTService } from '@modules/inventory/service/stock.t.service';
import { ProductImageTService } from '../product_image/service/product_image.t.service';
import { PriceTService } from '../price/service/price.t.service';
import { Product } from '@modules/product/product.entity';

export class SKUService {
  constructor(
    @InjectRepository(SKU)
    private readonly skuRepository: Repository<SKU>,
    @InjectRepository(ProductOption)
    private readonly productOptionRepository: Repository<ProductOption>,
    @InjectRepository(ProductOptionValue)
    private readonly productOptionValueRepository: Repository<ProductOptionValue>,

    private readonly attributeService: AttributeService,

    private readonly slugUtil: SlugUtil,
    private readonly skuUtil: SKUUtil,

    private readonly priceService: PriceService,
    private readonly stockService: StockService,
    private readonly imageService: ProductImageService,

    private readonly priceTService: PriceTService,
    private readonly stockTService: StockTService,
    private readonly imageTService: ProductImageTService,
  ) {}

  createHandler(sku: SKU) {
    return new SKUHandler(
      this.skuRepository,
      this.priceService,
      this.stockService,
      this.imageService,
      sku,
    );
  }

  createTHandler(queryRunner: QueryRunner, sku: SKU) {
    return new SKUTHandler(
      this.priceTService,
      this.stockTService,
      this.imageTService,
      queryRunner,
      sku,
    );
  }

  async createT(
    queryRunner: QueryRunner,
    product: Product,
    createSkuDto: CreateSkuDto,
  ) {
    // Attributes

    const validatedAttributes: AttributeFO[] = [];

    for (const attribute of createSkuDto.attributes) {
      const validatedAttribute =
        await this.attributeService.validateValueAttribute(
          attribute.attributeId,
          attribute.valueIds,
        );

      let attributeValueFOVs: AttributeValueFOV[] = [];

      for (const attributeValue of validatedAttribute.values) {
        let attributeValueX: AttributeValueFOV = {
          ...attributeValue,
          priority: attribute.valueIds.find(
            (valueId) => attributeValue.id === valueId.valueId,
          ).priority,
        };

        attributeValueFOVs.push(attributeValueX);
      }

      let attributeX: AttributeFO = {
        ...validatedAttribute,
        priority: attribute.priority,
        attributeValueFOVs,
      };

      validatedAttributes.push(attributeX);
    }

    // Options

    const productOptions: ProductOption[] = [];

    for (const validatedAttribute of validatedAttributes) {
      const productOptionValues: ProductOptionValue[] = [];

      for (const value of validatedAttribute.attributeValueFOVs) {
        const optionValue = queryRunner.manager.create(ProductOptionValue, {
          attributeValue: value,
          priority: value.priority,
        });

        productOptionValues.push(optionValue);
      }

      let option = queryRunner.manager.create(ProductOption, {
        attribute: validatedAttribute,
        priority: validatedAttribute.priority,
        values: productOptionValues,
      });

      option = await queryRunner.manager.save(option);
      option = await queryRunner.manager.findOne(ProductOption, {
        where: {
          id: option.id,
        },
        relations: {
          values: {
            attributeValue: true,
          },
        },
      });
      productOptions.push(option);
    }

    const optionValuesArrays = productOptions.map((option) => option.values);
    const combinations = this.skuUtil.cartesian(...optionValuesArrays);

    // SKUS

    const skus: SKU[] = [];

    for (const combination of combinations) {
      console.log(combination);

      const values = combination
        .map((optionValue) => optionValue.attributeValue.value)
        .join(' ');

      const name = product.name + ' ' + values;

      const slug = this.slugUtil.create(name);

      let sku = queryRunner.manager.create(SKU, {
        name,
        slug,
        optionValues: combination,
        product,
      });

      sku = await queryRunner.manager.save(sku);
      skus.push(sku);
    }

    return skus;
  }

  async findBySlug(slug: string) {
    return await this.skuRepository.findOne({
      where: {
        slug: slug,
      },
    });
  }

  async findByIds(ids: number[]): Promise<SKU[]> {
    return await this.skuRepository.find({
      where: {
        id: In(ids),
      },
    });
  }

  async findById(id: number) {
    return await this.skuRepository.findOne({
      where: { id },
      relations: {
        optionValues: true,
        stocks: true,
      },
    });
  }

  async findAll() {
    return await this.skuRepository.find({
      relations: {
        optionValues: true,
        stocks: true,
      },
    });
  }

  async deleteById(id: number) {
    return await this.skuRepository.delete(id);
  }
}
