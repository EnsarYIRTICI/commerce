import { Order } from '@modules/order/order.entity';
import { OrderItem } from '@modules/order_item/order_item.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, QueryFailedError, Repository } from 'typeorm';

import { ProductVariantService } from '@modules/product_variant/product_variant.service';
import { User } from '@modules/user/user.entity';
import { CreateOrderDto } from '@modules/order/dto/createOrderDto';
import { ProductVariant } from '@modules/product_variant/product_variant.entity';
import { errorMessages } from '@common/errorMessages';
import { AddressService } from '@modules/address/address.service';
import { CategoryService } from '@modules/category/category.service';
import { ProductAttributeValueService } from '@modules/product_attribute_value/product_attribute_value.service';
import { Category } from '@modules/category/category.entity';
import { CreateProductDto } from '@modules/product/dto/create_product.dto';
import { createSlug } from '@utils/string.util';
import { Product } from '@modules/product/product.entity';
import { ProductAttributeValue } from '@modules/product_attribute_value/product_attribute_value.entity';
import { ProductImage } from '@modules/product_image/product_image.entity';

@Injectable()
export class ProductDomainService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly categoryService: CategoryService,
    private readonly product_attribute_valueService: ProductAttributeValueService,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Categories

      const categories: Category[] = await this.categoryService.findByIds(
        createProductDto.categories,
      );

      // Product

      const slug = createSlug(createProductDto.name);

      let product = queryRunner.manager.create(Product, {
        categories,
        name: createProductDto.name,
        slug: slug,
        description: createProductDto.description,
        createdAt: new Date(),
      });

      product = await queryRunner.manager.save(Product, product);

      // Variants

      for (const createVariantDto of createProductDto.variants) {
        // Attributes

        const attributeValues: ProductAttributeValue[] =
          await this.product_attribute_valueService.findByIds(
            createVariantDto.attributeValues,
          );

        // Variant

        const slug = createSlug(createVariantDto.name);

        let productVariant = queryRunner.manager.create(ProductVariant, {
          name: createVariantDto.name,
          slug: slug,
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

      // commit transaction

      await queryRunner.commitTransaction();

      // Find a New Product

      product = await queryRunner.manager.findOne(Product, {
        where: { id: product.id },
        relations: {
          categories: true,
          variants: {
            attributeValues: true,
            images: true,
          },
        },
      });

      console.log('NEW PRODUCT', product);

      return product;
    } catch (error) {
      // rollback transaction

      await queryRunner.rollbackTransaction();

      throw error;
    } finally {
      // exit

      await queryRunner.release();
    }
  }
}
