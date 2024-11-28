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
import { UserService } from './user.service';
import { User } from './user.entity';
import { CreateCartItemDto } from '@modules/shopping_cart/cart_item/dto/create_cart_item.dto';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { UserShoppingCartService } from './user-shopping-cart.service';
import { Request } from 'express';

@ApiBearerAuth()
@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly userShoppingCartService: UserShoppingCartService,
  ) {}

  @Get('/shopping-cart/items')
  async getCartItems(@Req() request: Request) {
    let user: User = request['user'];

    user = await this.userShoppingCartService.init({
      id: user.id,
    } as User);

    return user.shoppingCart;
  }

  @Post('/shopping-cart/items')
  @ApiBody({ type: CreateCartItemDto })
  async addItemToCart(
    @Req() request: Request,
    @Body() createCartItemDto: CreateCartItemDto,
  ) {
    let user: User = request['user'];

    user = await this.userShoppingCartService.init({
      id: user.id,
    } as User);

    return this.userShoppingCartService.addItem(createCartItemDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.userService.findOne(id);
  }

  @Post()
  create(@Body() user: User) {
    return this.userService.create(user);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() user: User) {
    return this.userService.update(id, user);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.userService.delete(id);
  }
}
