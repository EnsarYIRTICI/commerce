import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, QueryFailedError, Repository } from 'typeorm';
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
    private dataSource: DataSource,

    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async findAllDetails() {
    return await this.productRepository.find({
      relations: {
        categories: true,
        variants: {
          images: true,
          attributeValues: true,
        },
      },
    });
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
