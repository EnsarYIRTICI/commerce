import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Product } from './product.entity';
import { MinioService } from '@database/minio/minio.service';
import { CreateProductDto } from './dto/create_product.dto';
import { ProductVariant } from '@modules/product_variant/product_variant.entity';
import { ProductImage } from '@modules/product_image/product_image.entity';
import { Category } from '@modules/category/category.entity';
import { ProductAttributeValue } from '@modules/product_attribute_value/product_attribute_value.entity';

@Injectable()
export class ProductService {
  constructor(
    private minioService: MinioService,
    private dataSource: DataSource,

    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const queryRunner = this.dataSource.createQueryRunner();

    // Transaction başlat

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Categories

      const categories: Category[] = [];

      for (const categoryId of createProductDto.categories) {
        const category = await queryRunner.manager.findOne(Category, {
          where: { id: categoryId },
        });

        if (!category) {
          throw new Error(`Category with ID ${categoryId} not found`);
        }

        categories.push(category);
      }

      // Product

      let product = queryRunner.manager.create(Product, {
        categories,
        description: createProductDto.description,
        name: createProductDto.name,
        createdAt: new Date(),
      });

      product = await queryRunner.manager.save(Product, product);

      // Variants

      for (const createVariantDto of createProductDto.variants) {
        const attributeValues: ProductAttributeValue[] = [];

        // Attributes

        for (const attributeValueId of createVariantDto.attributeValues) {
          const attributeValue = await queryRunner.manager.findOne(
            ProductAttributeValue,
            {
              where: { id: attributeValueId },
            },
          );

          if (!attributeValue) {
            throw new Error(
              `Attribute Value with ID ${attributeValueId} not found`,
            );
          }

          attributeValues.push(attributeValue);
        }

        // Variant

        let productVariant = queryRunner.manager.create(ProductVariant, {
          name: createVariantDto.name,
          price: createVariantDto.price,
          sku: createVariantDto.sku,
          stock: createVariantDto.stock,
          attributeValues,
          product,
        });

        productVariant = await queryRunner.manager.save(
          ProductVariant,
          productVariant,
        );

        // Image

        for (const imageUrl of createVariantDto.images) {
          const productImage = queryRunner.manager.create(ProductImage, {
            name: imageUrl,
            productVariant,
          });

          await queryRunner.manager.save(ProductImage, productImage);
        }
      }

      // Commit transaction

      await queryRunner.commitTransaction();

      // Ürünü ve ilişkili verileri geri döndür

      product = await queryRunner.manager.findOne(Product, {
        where: { id: product.id },
        relations: { categories: true, variants: true },
      });

      console.log('NEW PRODUCT', product);

      return product;
    } catch (error) {
      // Rollback transaction

      await queryRunner.rollbackTransaction();

      throw error;
    } finally {
      // Sonda QueryRunner'ı serbest bırak

      await queryRunner.release();
    }
  }

  findAll() {
    return this.productRepository.find();
  }

  findOne(id: number) {
    return this.productRepository.findOne({ where: { id } });
  }

  create(product: Product) {
    return this.productRepository.save(product);
  }

  update(id: number, product: Product) {
    return this.productRepository.update(id, product);
  }

  delete(id: number) {
    return this.productRepository.delete(id);
  }
}
