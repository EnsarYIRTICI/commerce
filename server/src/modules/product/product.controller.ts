import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.entity';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { errorMessages } from '@common/errorMessages';
import { CreateProductDto } from './dto/create_product.dto';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { Roles } from '@decorators/role.decorator';
import { ProductFileInterceptor } from 'src/interceptor/product.file.interceptor';
import { DataSource, QueryFailedError } from 'typeorm';
import { Category } from '@modules/category/category.entity';
import { ProductVariant } from '@modules/product_variant/product_variant.entity';
import { ProductImage } from '@modules/product_image/product_image.entity';
import { ProductAttributeValue } from '@modules/product_attribute_value/product_attribute_value.entity';
import { SlugService } from 'src/services/slug.service';
import { CategoryService } from '@modules/category/category.service';
import { ProductAttributeValueService } from '@modules/product_attribute_value/product_attribute_value.service';

@ApiBearerAuth()
@Controller('products')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly categoryService: CategoryService,
    private readonly product_attribute_valueService: ProductAttributeValueService,
    private readonly dataSource: DataSource,
    private readonly slugService: SlugService,
  ) {}

  @Post('create')
  @UseInterceptors(ProductFileInterceptor)
  async createProduct(@Body() createProductDto: CreateProductDto) {
    try {
      // Transaction

      const queryRunner = this.dataSource.createQueryRunner();

      await queryRunner.connect();
      await queryRunner.startTransaction();

      try {
        // Categories

        const categories: Category[] = await this.categoryService.findByIds(
          createProductDto.categories,
        );

        // Product

        const slug = this.slugService.createSlug(createProductDto.name);

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

          const slug = this.slugService.createSlug(createVariantDto.name);

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
    } catch (error) {
      if (error instanceof QueryFailedError) {
        console.log(error.message);

        throw new HttpException(
          error.message,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      console.error(error);

      throw new HttpException(
        errorMessages.INTERNAL_SERVER_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('details')
  async finAllDetails() {
    return await this.productService.findAllDetails();
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.productService.findOne(id);
  }

  @Post()
  create(@Body() product: Product) {
    return this.productService.create(product);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() product: Product) {
    return this.productService.update(id, product);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.productService.delete(id);
  }
}
