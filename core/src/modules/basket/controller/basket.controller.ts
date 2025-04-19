import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
  Req,
} from '@nestjs/common';
import { BasketService } from '../service/basket.service';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { CartItem } from '../entities/cart_item.entity';

@ApiBearerAuth()
@ApiTags('Basket')
@Controller('basket-items')
export class BasketController {
  constructor(private readonly cart_itemService: BasketService) {}

  @Get()
  findAll() {
    return this.cart_itemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.cart_itemService.findOne(id);
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
