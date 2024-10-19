
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductImage } from './product_image.entity';

@Injectable()
export class ProductImageService {
  constructor(
    @InjectRepository(ProductImage)
    private product_imageRepository: Repository<ProductImage>,
  ) {}

  findAll() {
    return this.product_imageRepository.find();
  }

  findOne(id: number) {
    return this.product_imageRepository.findOne({ where: { id } });
  }

  create(product_image: ProductImage) {
    return this.product_imageRepository.save(product_image);
  }

  update(id: number, product_image: ProductImage) {
    return this.product_imageRepository.update(id, product_image);
  }

  delete(id: number) {
    return this.product_imageRepository.delete(id);
  }
}
