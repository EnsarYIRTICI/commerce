import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, QueryFailedError, Repository } from 'typeorm';
import { Product } from './product.entity';
import { MinioService } from '@modules/storage/minio/minio.service';
import { CreateProductDto } from './dto/create_product.dto';
import { Category } from '@modules/product/category/category.entity';
import { CategoryService } from '@modules/product/category/category.service';
import { errorMessages } from 'src/shared/common/errorMessages';
import { SlugUtil } from '@shared/utils/slug.util';

@Injectable()
export class ProductService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly slugUtil: SlugUtil,
    private readonly categoryService: CategoryService,

    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  // CUSTOM

  async validateBySlug(slug: string) {
    const product = await this.findOneBySlug(slug);
    if (!product) {
      throw new BadRequestException('Product not found.');
    }
    return product;
  }

  async findOneBySlug(slug: string) {
    return await this.productRepository.findOne({
      where: {
        slug: slug,
      },
      relations: {
        categories: true,
        skus: {
          images: true,
          optionValues: true,
        },
      },
    });
  }

  // CRUD

  async findAll() {
    return await this.productRepository.find({
      relations: {
        categories: true,
        skus: {
          images: true,
          optionValues: true,
        },
      },
    });
  }

  findOne(id: number) {
    return this.productRepository.findOne({ where: { id } });
  }

  async create(createProductDto: CreateProductDto) {
    const categories: Category[] = await this.categoryService.findByIds(
      createProductDto.categories,
    );

    const createdAt = new Date();
    const slug = this.slugUtil.create(createProductDto.name);

    return await this.productRepository.save({
      name: createProductDto.name,
      description: createProductDto.description,
      slug,
      createdAt,
      categories,
    });
  }

  update(id: number, product: Product) {
    return this.productRepository.update(id, product);
  }

  delete(id: number) {
    return this.productRepository.delete(id);
  }
}
