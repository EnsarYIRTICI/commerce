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
import { CartItemService } from './cart_item.service';
import { CartItem } from './cart_item.entity';
import { Request } from 'express';
import { User } from '@modules/user/user.entity';
import { CreateCartItemDto } from './dto/create_cart_item.dto';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Cart Item')
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
  @ApiBody({ type: CreateCartItemDto })
  async create(@Req() request: Request, createCartItemDto: CreateCartItemDto) {
    let user: User = request['user'];

    return await this.cart_itemService.create(user, createCartItemDto);
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
