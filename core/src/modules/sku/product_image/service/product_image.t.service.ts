import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { ProductImage } from '../entities/product_image.entity';
import { SKU } from '@modules/sku/entites/sku.entity';

@Injectable()
export class ProductImageTService {
  constructor(
    @InjectRepository(ProductImage)
    private product_imageRepository: Repository<ProductImage>,
  ) {}

  async create(
    queryRunner: QueryRunner,
    sku: SKU,
    name: string,
  ): Promise<ProductImage> {
    const productImage = queryRunner.manager.create(ProductImage, {
      name,
      productVariant: sku,
    });

    return await queryRunner.manager.save(ProductImage, productImage);
  }
}
