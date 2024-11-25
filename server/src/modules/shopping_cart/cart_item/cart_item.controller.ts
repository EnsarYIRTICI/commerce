
import { Controller, Get, Post, Param, Body, Put, Delete } from '@nestjs/common';
import { CartItemService } from './cart_item.service';
import { CartItem } from './cart_item.entity';

@Controller('cart_items')
export class CartItemController {
  constructor(private readonly cart_itemService: CartItemService) {}

  @Get()
  findAll() {
    return this.cart_itemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.cart_itemService.findOne(id);
  }

  @Post()
  create(@Body() cart_item: CartItem) {
    return this.cart_itemService.create(cart_item);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() cart_item: CartItem) {
    return this.cart_itemService.update(id, cart_item);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.cart_itemService.delete(id);
  }
}
