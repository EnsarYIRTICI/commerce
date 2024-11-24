import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { OrderItemService } from './order_item.service';
import { OrderItem } from './order_item.entity';

@Controller('order_items')
export class OrderItemController {
  constructor(private readonly order_itemService: OrderItemService) {}

  @Get()
  findAll() {
    return this.order_itemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.order_itemService.findOne(id);
  }

  @Post()
  create(@Body() order_item: OrderItem) {
    return this.order_itemService.create(order_item);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() order_item: OrderItem) {
    return this.order_itemService.update(id, order_item);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.order_itemService.delete(id);
  }
}
