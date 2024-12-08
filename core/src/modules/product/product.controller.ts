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
import { errorMessages } from 'src/shared/common/errorMessages';
import { CreateProductDto } from './dto/create_product.dto';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/shared/decorators/role.decorator';
import { ProductFileInterceptor } from 'src/shared/interceptor/product.file.interceptor';
import { DataSource, QueryFailedError } from 'typeorm';
import { Category } from '@modules/product/category/category.entity';
import { ProductVariant } from '@modules/product/product_variant/product_variant.entity';
import { ProductAttributeValue } from '@modules/product/product_attribute_value/product_attribute_value.entity';
import { CategoryService } from '@modules/product/category/category.service';
import { ProductAttributeValueService } from '@modules/product/product_attribute_value/product_attribute_value.service';
import { createSlug } from 'src/shared/utils/string.util';

@ApiBearerAuth()
@ApiTags('Product')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // CUSTOM

  @Get('by/slug/:slug')
  async findOneBySlug(@Param('slug') slug: string) {
    return await this.productService.findOneBySlug(slug);
  }

  // CRUD

  @Get()
  async findAll() {
    return await this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productService.findOne(id);
  }

  @Post()
  @UseInterceptors(ProductFileInterceptor)
  async create(@Body() createProductDto: CreateProductDto) {
    try {
      return await this.productService.create(createProductDto);
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

  @Put(':id')
  update(@Param('id') id: number, @Body() product: Product) {
    return this.productService.update(id, product);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.productService.delete(id);
  }
}
