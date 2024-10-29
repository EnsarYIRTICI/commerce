import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Product } from './product.entity';
import { ImageProcessingService } from '@utils/image-processing.service';
import { MinioService } from '@database/minio/minio.service';
import { CreateProductDto } from './dto/create_product.dto';
import { ProductVariant } from '@modules/product_variant/product_variant.entity';
import { VariantAttributeValueItem } from '@modules/variant_attribute_value_item/variant_attribute_value_item.entity';
import { ProductImage } from '@modules/product_image/product_image.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private minioService: MinioService,
    private imageProcessingService: ImageProcessingService,
    private dataSource: DataSource,

    @InjectRepository(ProductVariant)
    private productVariantRepository: Repository<ProductVariant>,

    @InjectRepository(VariantAttributeValueItem)
    private variantAttributeValueItemRepository: Repository<VariantAttributeValueItem>,
  ) {}

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    console.log(createProductDto);

    return;
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
