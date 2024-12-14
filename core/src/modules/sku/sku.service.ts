import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, QueryRunner, Repository } from 'typeorm';
import { CartItem } from '@modules/cart_item/entities/cart_item.entity';
import { SKU } from './entites/sku.entity';
import { CreateSkuDto } from './dto/create-sku.dto';
import { ProductOption } from './entites/product-option.entity';
import { ProductOptionValue } from './entites/product-option-value.entity';
import { AttributeService } from '@modules/attribute/attribute.service';
import { Attribute } from '@modules/attribute/entities/attribute.entity';
import { ProductService } from '@modules/product/product.service';
import { SlugUtil } from '@shared/utils/slug.util';
import { SKUUtil } from '@shared/utils/sku.util';
import { AttributeValue } from '@modules/attribute/entities/attribute-value.entity';
import {
  AttributeFO,
  AttributeValueFOV,
} from './interface/attribute.interface';

@Injectable()
export class SKUService {
  constructor(
    @InjectRepository(SKU)
    private readonly skuRepository: Repository<SKU>,
    @InjectRepository(ProductOption)
    private readonly productOptionRepository: Repository<ProductOption>,
    @InjectRepository(ProductOptionValue)
    private readonly productOptionValueRepository: Repository<ProductOptionValue>,

    private readonly attributeService: AttributeService,
    private readonly productService: ProductService,

    private readonly slugUtil: SlugUtil,
    private readonly skuUtil: SKUUtil,
  ) {}

  async create(createSkuDto: CreateSkuDto) {
    // Transaction başlat

    const queryRunner =
      this.skuRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const product = await this.productService.findOneBySlug(
        createSkuDto.slug,
      );

      if (!product) {
        throw new BadRequestException('Product not found.');
      }

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

      console.log('Attributes ', validatedAttributes);

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

      console.log('Options ', productOptions);

      const optionValuesArrays = productOptions.map((option) => option.values);
      const combinations = this.skuUtil.cartesian(...optionValuesArrays);

      console.log('Cartesian ', combinations);

      const skus: SKU[] = [];

      for (const combination of combinations) {
        console.log(combination);

        const values = combination
          .map((optionValue) => optionValue.attributeValue.value)
          .join(' ');

        const name = product.name + ' ' + values;

        const slug = this.slugUtil.create(name);

        console.log('Values ', values);
        console.log('Name ', name);
        console.log('Slug ', slug);

        let sku = queryRunner.manager.create(SKU, {
          name,
          slug,
          optionValues: combination,
          product,
        });

        sku = await queryRunner.manager.save(sku);
        skus.push(sku);
      }

      // İşlemi tamamla
      await queryRunner.commitTransaction();

      console.log('Skus ', skus);

      return skus;
    } catch (error) {
      // Hata durumunda işlemi geri al
      await queryRunner.rollbackTransaction();

      console.log(error.message);

      throw new BadRequestException(
        'An error occurred while creating SKUs.',
        error.message,
      );
    } finally {
      // Transaction bağlantısını kapat
      await queryRunner.release();
    }
  }

  async findOneBySlug(slug: string) {
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

  async findAll() {
    return await this.skuRepository.find({
      relations: {
        optionValues: true,
      },
    });
  }

  async findOne(id: number) {
    return await this.skuRepository.findOne({ where: { id } });
  }

  async update(id: number, sku: SKU) {
    return await this.skuRepository.update(id, sku);
  }

  async delete(id: number) {
    return await this.skuRepository.delete(id);
  }
}
