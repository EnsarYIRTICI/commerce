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
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductDto } from './dto/product.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('create')
  @UseInterceptors(FileInterceptor('image'))
  async createProduct(
    @Body() productDto: ProductDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    const product = await this.productService.createProductWithImage(
      productDto,
      image.buffer,
    );
    return product;
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
