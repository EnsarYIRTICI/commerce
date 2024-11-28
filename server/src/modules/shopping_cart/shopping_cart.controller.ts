import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { ShoppingCartService } from './shopping_cart.service';
import { ShoppingCart } from './shopping_cart.entity';

@Controller('shopping_carts')
export class ShoppingCartController {
  constructor(private readonly shopping_cartService: ShoppingCartService) {}

  @Get()
  findAll() {
    return this.shopping_cartService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.shopping_cartService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() shopping_cart: ShoppingCart) {
    return this.shopping_cartService.update(id, shopping_cart);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.shopping_cartService.delete(id);
  }
}
