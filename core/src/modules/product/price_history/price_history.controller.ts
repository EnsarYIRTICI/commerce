import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { PriceHistoryService } from './price_history.service';
import { PriceHistory } from './price_history.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Price History')
@Controller('price_histories')
export class PriceHistoryController {
  constructor(private readonly price_historyService: PriceHistoryService) {}

  @Get()
  findAll() {
    return this.price_historyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.price_historyService.findOne(id);
  }

  @Post()
  create(@Body() price_history: PriceHistory) {
    return this.price_historyService.create(price_history);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() price_history: PriceHistory) {
    return this.price_historyService.update(id, price_history);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.price_historyService.delete(id);
  }
}
