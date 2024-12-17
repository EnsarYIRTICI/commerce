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
  UseInterceptors,
} from '@nestjs/common';
import { SKUService } from '../service/sku.service';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { SKU } from '../entites/sku.entity';
import { CreateSkuDto } from '../dto/create-sku.dto';
import { UpdateSkuDto } from '../dto/update-sku.dto';
import { SkuImageInterceptor } from '@shared/interceptor/sku.image.interceptor';
import { SKUHandler } from '../handler/sku.handler';
import { UpdateSkuImageDto } from '../dto/update-sku-image.dto';
import { DataSource } from 'typeorm';

@ApiBearerAuth()
@ApiTags('SKU')
@Controller('skus')
export class SKUController {
  constructor(
    private readonly dataSource: DataSource,
    private readonly skuService: SKUService,
  ) {}

  @Get()
  async findAll() {
    return await this.skuService.findAll();
  }

  @Post()
  async create(@Body() createSkuDto: CreateSkuDto) {
    try {
      return await this.skuService.create(createSkuDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put()
  async update(@Param('id') id: number, @Body() updateSkuDto: UpdateSkuDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const sku = await this.skuService.findBySlug(updateSkuDto.slug);

      const skuTHandler = this.skuService.createTHandler(queryRunner, sku);

      await skuTHandler.saveBarcode(updateSkuDto.barcode);
      await skuTHandler.saveStock(updateSkuDto.stockDetails);
      await skuTHandler.createPrice(updateSkuDto.priceDetails);

      await queryRunner.commitTransaction();
      return sku;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    } finally {
      await queryRunner.release();
    }
  }

  @Put('image')
  @UseInterceptors(SkuImageInterceptor)
  async updateImage(@Param('id') id: number, @Body() dto: UpdateSkuImageDto) {
    const sku = await this.skuService.findBySlug(dto.slug);

    const skuHandler = this.skuService.createHandler(sku);

    await skuHandler.createImage(dto);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.skuService.findById(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.skuService.deleteById(id);
  }
}
