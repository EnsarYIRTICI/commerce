import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductImage } from '../entities/product_image.entity';
import { SKU } from '@modules/sku/entites/sku.entity';

@Injectable()
export class ProductImageService {
  constructor(
    @InjectRepository(ProductImage)
    private product_imageRepository: Repository<ProductImage>,
  ) {}

  async create(sku: SKU, name: string) {
    return await this.product_imageRepository.save({
      name,
      productVariant: sku,
    });
  }
}
