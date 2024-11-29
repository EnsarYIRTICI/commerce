import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
  Req,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { CreateCartItemDto } from '@modules/shopping_cart/cart_item/dto/create_cart_item.dto';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { UserCartFacade } from './user-cart/user-cart.facade';
import { Request } from 'express';
import { CreateOrderDto } from '@modules/order/dto/createOrder.dto';
import { errorMessages } from '@common/errorMessages';
import { QueryFailedError } from 'typeorm';
import { UserOrderFacade } from './user-order/user-order.facade';

@ApiBearerAuth()
@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly userCartFacade: UserCartFacade,
    private readonly userOrderFacade: UserOrderFacade,
  ) {}

  @Get('/shopping-cart/items')
  async getCartItems(@Req() request: Request) {
    let user: User = request['user'];

    this.userCartFacade.init(user);

    return await this.userCartFacade.getItems();
  }

  @Post('/shopping-cart/items')
  @ApiBody({ type: CreateCartItemDto })
  async addItemToCart(
    @Req() request: Request,
    @Body() createCartItemDto: CreateCartItemDto,
  ) {
    let user: User = request['user'];

    this.userCartFacade.init(user);

    return await this.userCartFacade.addItem(createCartItemDto);
  }

  @Get('/order/order-items')
  async getOrders(@Req() request: Request) {
    try {
      const user: User = request['user'];

      this.userOrderFacade.init(user);

      return await this.userOrderFacade.getOrders();
    } catch (error) {
      if (error instanceof QueryFailedError) {
        console.log(error.message);

        throw new HttpException(
          error.message,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      console.error(error);

      throw new HttpException(
        errorMessages.INTERNAL_SERVER_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('/order/order-items')
  @ApiBody({ type: CreateOrderDto })
  async createOrder(
    @Req() request: Request,
    @Body() createOrderDto: CreateOrderDto,
  ) {
    try {
      const user: User = request['user'];
      const ip = request.ip;

      this.userOrderFacade.init(user);

      return await this.userOrderFacade.createOrder(ip, createOrderDto);
    } catch (error) {
      if (error instanceof QueryFailedError) {
        console.log(error.message);

        throw new HttpException(
          error.message,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      console.error(error);

      throw new HttpException(
        errorMessages.INTERNAL_SERVER_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
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
