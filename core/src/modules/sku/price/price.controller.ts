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
@ApiTags('Price History')
@Controller('price_histories')
export class PriceController {
  constructor(private readonly price_historyService: PriceService) {}

  @Get()
  findAll() {
    return this.price_historyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.price_historyService.findOne(id);
  }

  @Post()
  create(@Body() price_history: Price) {
    return this.price_historyService.create(price_history);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() price_history: Price) {
    return this.price_historyService.update(id, price_history);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.price_historyService.delete(id);
  }
}
