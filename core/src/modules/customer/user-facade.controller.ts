import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Req,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CreateCartItemDto } from '@modules/cart_item/dto/create_cart_item.dto';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { CreateOrderDto } from '@modules/order/dto/createOrder.dto';
import { User } from '@modules/user/user.entity';
import { CreateWishlistDto } from '@modules/wishlist/dto/create-wishlist.dto';
import { CreateWishlistItemDto } from '@modules/wishlist/wishlist_item/dto/create-wishlist-item.dto';
import { CreateReviewDto } from './dto/create-review.dto';
import { UserFacadeFactory } from './user-facade.factory';
import { Roles } from 'src/shared/decorators/role.decorator';

@Roles('user')
@ApiBearerAuth()
@ApiTags('User Facade')
@Controller('users')
export class UserFacadeController {
  constructor(private readonly userFacadeFactory: UserFacadeFactory) {}

  @Get('/orders')
  async getOrders(@Req() request: Request) {
    try {
      const user: User = request['user'];
      const facade = this.userFacadeFactory.createOrderFacade(user);
      return await facade.getOrders();
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
      const userCartFacade = this.userFacadeFactory.createCartFacade(user);
      const { cartItems, totalAmount } = await userCartFacade.getItems();
      const orderFacade = this.userFacadeFactory.createOrderFacade(user);
      const order = await orderFacade.createOrder(
        request.ip,
        createOrderDto,
        cartItems,
        totalAmount,
      );
      await userCartFacade.clearItems();
      return order;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('/wishlists')
  async getWishlists(@Req() request: Request) {
    try {
      const user: User = request['user'];
      const userWishlistFacade =
        this.userFacadeFactory.createWishlistFacade(user);
      return await userWishlistFacade.getLists();
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
      const user: User = request['user'];
      const userWishlistFacade =
        this.userFacadeFactory.createWishlistFacade(user);
      return await userWishlistFacade.createList(createWishlistDto.name);
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
      const user: User = request['user'];
      const userWishlistFacade =
        this.userFacadeFactory.createWishlistFacade(user);
      const wishlist = await userWishlistFacade.getListById(wishlistId);
      const userWishlistItemFacade =
        this.userFacadeFactory.createWishlistItemFacade(wishlist);
      return await userWishlistItemFacade.getItems();
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
      const user: User = request['user'];
      const userWishlistFacade =
        this.userFacadeFactory.createWishlistFacade(user);
      const wishlist = await userWishlistFacade.getListById(
        createWishlistItemDto.wishlistId,
      );
      const userWishlistItemFacade =
        this.userFacadeFactory.createWishlistItemFacade(wishlist);
      return await userWishlistItemFacade.addItem(createWishlistItemDto.slug);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('/cart-items')
  async getCartItems(@Req() request: Request) {
    try {
      const user: User = request['user'];
      const userCartFacade = this.userFacadeFactory.createCartFacade(user);
      const { cartItems, totalAmount } = await userCartFacade.getItems();
      return { totalAmount, cartItems };
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
      const user: User = request['user'];
      const userCartFacade = this.userFacadeFactory.createCartFacade(user);
      return await userCartFacade.addItem(createCartItemDto.slug);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('/reviews')
  async getReviews(@Req() request: Request) {
    try {
      const user: User = request['user'];
      const userReviewFacade = this.userFacadeFactory.createReviewFacade(user);
      return await userReviewFacade.getReviews();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('/review')
  @ApiBody({ type: CreateReviewDto })
  async createReview(
    @Req() request: Request,
    @Body() createReviewDto: CreateReviewDto,
  ) {
    try {
      const user: User = request['user'];
      const userReviewFacade = this.userFacadeFactory.createReviewFacade(user);
      return await userReviewFacade.createReview(createReviewDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
