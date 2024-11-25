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
  ParseIntPipe,
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
import { Category } from '@modules/product/category/category.entity';
import { ProductVariant } from '@modules/product/product_variant/product_variant.entity';
import { ProductAttributeValue } from '@modules/product/product_attribute_value/product_attribute_value.entity';
import { CategoryService } from '@modules/product/category/category.service';
import { ProductAttributeValueService } from '@modules/product/product_attribute_value/product_attribute_value.service';
import { createSlug } from '@utils/string.util';
import { ProductDomainService } from '@modules/product/product.domain';

@ApiBearerAuth()
@Controller('products')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly productDomain: ProductDomainService,
    private readonly categoryService: CategoryService,
    private readonly product_attribute_valueService: ProductAttributeValueService,
    private readonly dataSource: DataSource,
  ) {}

  // CUSTOM

  @Post('create')
  @UseInterceptors(ProductFileInterceptor)
  async domainCreate(@Body() createProductDto: CreateProductDto) {
    try {
      return await this.productDomain.create(createProductDto);
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

  @Get('detail/:slug')
  async findBySlug(@Param('slug') slug: string) {
    return await this.productService.findBySlug(slug);
  }

  // CRUD

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
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
