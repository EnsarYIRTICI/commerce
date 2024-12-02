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
  BadRequestException,
} from '@nestjs/common';

import { CreateCartItemDto } from '@modules/cart_item/dto/create_cart_item.dto';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { UserCartFacade } from './user-cart/user-cart.facade';
import { Request } from 'express';
import { CreateOrderDto } from '@modules/order/dto/createOrder.dto';
import { errorMessages } from 'src/shared/common/errorMessages';
import { QueryFailedError } from 'typeorm';
import { UserOrderFacade } from './user-order/user-order.facade';
import { UserWishlistFacade } from './user-wishlist/user-wishlist.facade';
import { UserWishlistItemFacade } from './user-wishlist-item/user-wishlist-item.facade';
import { CreateWishlistDto } from '@modules/wishlist/dto/create-wishlist.dto';
import { Roles } from 'src/shared/decorators/role.decorator';
import { CreateWishlistItemDto } from '@modules/wishlist/wishlist_item/dto/create-wishlist-item.dto';
import { User } from '@modules/user/user.entity';
import { UserReviewFacade } from './user-review/user-review.facade';

@Roles('user')
@ApiBearerAuth()
@ApiTags('User Facade')
@Controller('users')
export class UserFacadeController {
  constructor(
    private readonly userCartFacade: UserCartFacade,
    private readonly userOrderFacade: UserOrderFacade,
    private readonly userWishlistFacade: UserWishlistFacade,
    private readonly userWishlistItemFacade: UserWishlistItemFacade,
    private readonly userReviewFacade: UserReviewFacade,
  ) {}

  @Get('/wishlists')
  async getWishlists(@Req() request: Request) {
    try {
      let user: User = request['user'];

      this.userWishlistFacade.init(user);

      return await this.userWishlistFacade.getLists();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
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
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
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
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
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
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('/cart-items')
  async getCartItems(@Req() request: Request) {
    try {
      let user: User = request['user'];

      this.userCartFacade.init(user);

      const { cartItems, totalAmount } = await this.userCartFacade.getItems();

      return {
        totalAmount: totalAmount,
        cartItems: cartItems,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
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
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('/orders')
  async getOrders(@Req() request: Request) {
    try {
      const user: User = request['user'];

      this.userOrderFacade.init(user);

      return await this.userOrderFacade.getOrders();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
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

      this.userCartFacade.init(user);

      const { cartItems, totalAmount } = await this.userCartFacade.getItems();
      if (!cartItems.length) {
        throw new BadRequestException('No item found in cart.');
      }

      this.userOrderFacade.init(user);

      let order = await this.userOrderFacade.createOrder(
        request.ip,
        createOrderDto,
        cartItems,
        totalAmount,
      );

      await this.userCartFacade.clearItems();

      return order;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
