
import { Controller, Get, Post, Param, Body, Put, Delete } from '@nestjs/common';
import { ProductImageService } from './product_image.service';
import { ProductImage } from './product_image.entity';

@Controller('product_images')
export class ProductImageController {
  constructor(private readonly product_imageService: ProductImageService) {}

  @Get()
  findAll() {
    return this.product_imageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.product_imageService.findOne(id);
  }

  @Post()
  create(@Body() product_image: ProductImage) {
    return this.product_imageService.create(product_image);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() product_image: ProductImage) {
    return this.product_imageService.update(id, product_image);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.product_imageService.delete(id);
  }
}
