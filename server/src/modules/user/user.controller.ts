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
  InternalServerErrorException,
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
import { UserWishlistFacade } from './user-wishlist/user-wishlist.facade';
import { UserWishlistItemFacade } from './user-wishlist-item/user-wishlist-item.facade';
import { CreateWishlistDto } from '@modules/wishlist/dto/create-wishlist.dto';
import { Roles } from '@decorators/role.decorator';
import { CreateWishlistItemDto } from '@modules/wishlist/wishlist_item/dto/create-wishlist-item.dto';

@Roles('user')
@ApiBearerAuth()
@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly userCartFacade: UserCartFacade,
    private readonly userOrderFacade: UserOrderFacade,
    private readonly userWishlistFacade: UserWishlistFacade,
    private readonly userWishlistItemFacade: UserWishlistItemFacade,
  ) {}

  @Get('/wishlists')
  async getWishlists(@Req() request: Request) {
    try {
      let user: User = request['user'];

      this.userWishlistFacade.init(user);

      return await this.userWishlistFacade.getLists();
    } catch (error) {
      console.error(error);

      throw new InternalServerErrorException();
    }
  }

  @Post('/wishlist')
  @ApiBody({ type: CreateWishlistDto })
  async createWishlist(
    @Req() request: Request,
    @Body() createWishlistDto: CreateWishlistDto,
  ) {
    try {
      let user: User = request['user'];

      this.userWishlistFacade.init(user);

      const name = createWishlistDto.name;

      return await this.userWishlistFacade.createList(name);
    } catch (error) {
      console.error(error);

      throw new InternalServerErrorException();
    }
  }

  @Get('/wishlist-items/:id')
  async getWishlistItems(
    @Req() request: Request,
    @Param('id') wishlistId: string,
  ) {
    try {
      let user: User = request['user'];

      this.userWishlistFacade.init(user);
      const wishlist = await this.userWishlistFacade.getListById(wishlistId);

      this.userWishlistItemFacade.init(wishlist);
      return await this.userWishlistItemFacade.getItems();
    } catch (error) {
      console.error(error);

      throw new InternalServerErrorException();
    }
  }

  @Post('/wishlist-item')
  @ApiBody({ type: CreateWishlistItemDto })
  async addItemToWishlist(
    @Req() request: Request,
    @Body() createWishlistItemDto: CreateWishlistItemDto,
  ) {
    try {
      let user: User = request['user'];

      this.userWishlistFacade.init(user);
      const wishlistId = createWishlistItemDto.wishlistId;
      const wishlist = await this.userWishlistFacade.getListById(wishlistId);

      this.userWishlistItemFacade.init(wishlist);
      const slug = createWishlistItemDto.slug;
      return await this.userWishlistItemFacade.addItem(slug);
    } catch (error) {
      console.error(error);

      throw new InternalServerErrorException();
    }
  }

  @Get('/cart-items')
  async getCartItems(@Req() request: Request) {
    try {
      let user: User = request['user'];

      this.userCartFacade.init(user);

      return await this.userCartFacade.getItems();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @Post('/cart-item')
  @ApiBody({ type: CreateCartItemDto })
  async addItemToCart(
    @Req() request: Request,
    @Body() createCartItemDto: CreateCartItemDto,
  ) {
    try {
      let user: User = request['user'];

      this.userCartFacade.init(user);

      const slug = createCartItemDto.slug;

      return await this.userCartFacade.addItem(slug);
    } catch (error) {
      console.error(error);

      throw new InternalServerErrorException();
    }
  }

  @Get('/orders')
  async getOrders(@Req() request: Request) {
    try {
      const user: User = request['user'];

      this.userOrderFacade.init(user);

      return await this.userOrderFacade.getOrders();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @Post('/order')
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
