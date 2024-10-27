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
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { errorMessages } from '@common/errorMessages';
import { CreateProductDto } from './dto/create_product.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('create')
  @UseInterceptors(FileInterceptor('image'))
  async createProduct(
    @Body() createProductDto: CreateProductDto,
    @UploadedFiles() images: Express.Multer.File[],
  ) {
    try {
      const product = await this.productService.createProduct(
        createProductDto,
        images,
      );
      return product;
    } catch (error) {
      console.log(error);

      return {
        statusCode: 500,
        message: errorMessages.INTERNAL_SERVER_ERROR,
      };
    }
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
