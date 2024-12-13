import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, QueryRunner, Repository } from 'typeorm';
import { CartItem } from '@modules/cart_item/cart_item.entity';
import { SKU } from './entites/sku.entity';
import { CreateSkuDto } from './dto/create-sku.dto';
import { ProductOption } from './entites/product-option.entity';
import { ProductOptionValue } from './entites/product-option-value.entity';
import { AttributeService } from '@modules/attribute/attribute.service';
import { Attribute } from '@modules/attribute/entities/attribute.entity';
import { ProductService } from '@modules/product/product.service';
import { SlugUtil } from '@shared/utils/slug.util';
import { SKUUtil } from '@shared/utils/sku.util';

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

      // Attributes'i priority'ye göre sırala
      const sortedAttributes = createSkuDto.attributes.sort(
        (a, b) => a.priority - b.priority,
      );

      // Doğrulama ve ilişkili verileri toplama
      const validatedAttributes: Attribute[] = [];

      for (const attribute of sortedAttributes) {
        const validatedAttribute =
          await this.attributeService.validateValueAttribute(
            attribute.attributeId,
            attribute.valueIds,
          );
        validatedAttributes.push(validatedAttribute);
      }

      const productOptions: ProductOption[] = [];

      validatedAttributes.map(async (attribute, i) => {
        const productOptionValues: ProductOptionValue[] = [];

        for (const value of attribute.values) {
          const optionValue = queryRunner.manager.create(ProductOptionValue, {
            value,
          });

          productOptionValues.push(optionValue);
        }

        let option = queryRunner.manager.create(ProductOption, {
          name: attribute,
          priority: i + 1,
          values: productOptionValues,
        });

        option = await queryRunner.manager.save(option);
        productOptions.push(option);
      });

      const optionValuesArrays = productOptions.map((option) => option.values); // Tüm OptionValue'ları alın
      const combinations = this.skuUtil.cartesian(...optionValuesArrays); // Kombinasyonları oluşturun

      const skus: SKU[] = [];

      for (const combination of combinations) {
        // Kombinasyon isimlendirme (örn: "Kırmızı L")
        const name = combination.map((value) => value.value).join(' ');
        const slug = this.slugUtil.create(name);

        let sku = queryRunner.manager.create(SKU, {
          name,
          slug,
          optionValues: combination, // Relation with ProductOptionValues
          product, // Relation with Product
        });

        sku = await queryRunner.manager.save(sku); // SKU'yu kaydet
        skus.push(sku);
      }

      // İşlemi tamamla
      await queryRunner.commitTransaction();

      return skus;
    } catch (error) {
      // Hata durumunda işlemi geri al
      await queryRunner.rollbackTransaction();

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
    return await this.skuRepository.find();
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
