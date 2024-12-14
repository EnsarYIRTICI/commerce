import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { PriceService } from './price.service';
import { Price } from './price.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Price')
@Controller('prices')
export class PriceController {
  constructor(private readonly priceService: PriceService) {}

  @Get()
  findAll() {
    return this.priceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.priceService.findOne(id);
  }

  @Post()
  create(@Body() price_history: Price) {
    return this.priceService.create(price_history);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() price_history: Price) {
    return this.priceService.update(id, price_history);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.priceService.delete(id);
  }
}
