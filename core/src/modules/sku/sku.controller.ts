import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { SKUService } from './sku.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SKU } from './entites/sku.entity';
import { CreateSkuDto } from './dto/create-sku.dto';

@ApiBearerAuth()
@ApiTags('SKU')
@Controller('sku')
export class SKUController {
  constructor(private readonly skuService: SKUService) {}

  @Post()
  async create(@Body() createSkuDto: CreateSkuDto) {
    try {
      return await this.skuService.create(createSkuDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  async findAll() {
    return await this.skuService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.skuService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() sku: SKU) {
    return await this.skuService.update(id, sku);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.skuService.delete(id);
  }
}
