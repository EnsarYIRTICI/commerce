import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, QueryFailedError, QueryRunner, Repository } from 'typeorm';
import { Product } from '../product.entity';
import { MinioService } from '@modules/storage/minio/minio.service';
import { CreateProductDto } from '../dto/create_product.dto';
import { Category } from '@modules/product/category/category.entity';
import { CategoryService } from '@modules/product/category/category.service';
import { errorMessages } from 'src/shared/common/errorMessages';
import { SlugUtil } from '@shared/utils/slug.util';
import { SKUService } from '@modules/sku/service/sku.service';

@Injectable()
export class ProductService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly slugUtil: SlugUtil,
    private readonly categoryService: CategoryService,
    private readonly skuService: SKUService,

    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const queryRunner: QueryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const categories: Category[] = await this.categoryService.findByIds(
        createProductDto.categories,
      );

      const createdAt = new Date();
      const slug = this.slugUtil.create(createProductDto.name);

      let product = await queryRunner.manager.save(Product, {
        name: createProductDto.name,
        description: createProductDto.description,
        slug,
        createdAt,
        categories,
      });

      const skus = await this.skuService.createT(
        queryRunner,
        product,
        createProductDto.options,
      );

      await queryRunner.commitTransaction();

      return skus;
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

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

  update(id: number, product: Product) {
    return this.productRepository.update(id, product);
  }

  delete(id: number) {
    return this.productRepository.delete(id);
  }
}
