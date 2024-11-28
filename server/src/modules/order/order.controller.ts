import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
  Req,
  HttpStatus,
  HttpException,
  BadRequestException,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from './order.entity';
import { Roles } from '@decorators/role.decorator';
import { DataSource, QueryFailedError } from 'typeorm';
import { CreateOrderDto } from './dto/createOrder.dto';
import { errorMessages } from '@common/errorMessages';

import { Request } from 'express';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { PaymentService } from '@modules/payment/interface/payment.service';
import { PaymentServiceFactory } from '@modules/payment/payment.service.factory';
import { CreditCardPaymentService } from '@modules/payment/credit-card-payment.service';
import { BankTransferPaymentService } from '@modules/payment/bank-transfer-payment.service';
import { AddressService } from '@modules/address/address.service';
import { ShoppingCartService } from '@modules/shopping_cart/shopping_cart.service';
import { User } from '@modules/user/user.entity';
import { UserShoppingCartService } from '@modules/user/user-shopping-cart.service';

@ApiBearerAuth()
@ApiTags('Order')
@Controller('orders')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly dataSource: DataSource,
    private readonly paymentFactory: PaymentServiceFactory,
    private readonly addressService: AddressService,
    private readonly shoppingCartService: ShoppingCartService,
    private readonly userShoppingCartService: UserShoppingCartService,
  ) {}

  // CRUD

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.orderService.findOne(id);
  }

  @Post()
  @ApiBody({ type: CreateOrderDto })
  async create(
    @Req() request: Request,
    @Body() createOrderDto: CreateOrderDto,
  ) {
    try {
      const date = new Date();

      let user: User = request['user'];
      const ip = request.ip;

      const shippingAddress = await this.addressService.validateUserAddressById(
        user,
        createOrderDto.shippingAddressId,
      );

      const billingAddress = createOrderDto.billingAddressId
        ? await this.addressService.validateUserAddressById(
            user,
            createOrderDto.billingAddressId,
          )
        : shippingAddress;

      user = await this.userShoppingCartService.init(user);

      const cartItems = user.shoppingCart.items;
      if (!cartItems.length) {
        throw new BadRequestException('No item found in cart.');
      }

      const paymentService: PaymentService = createOrderDto.paymentCard
        ? (this.paymentFactory.getPaymentService(
            'CreditCard',
          ) as CreditCardPaymentService)
        : (this.paymentFactory.getPaymentService(
            'BankTransfer',
          ) as BankTransferPaymentService);

      paymentService.init({
        billingAddress: billingAddress,
        shippingAddress: shippingAddress,
        cartItems: cartItems,
        date: date,
        ip: ip,
        user: user,
      });

      if (paymentService instanceof CreditCardPaymentService) {
        paymentService.initCreditCard(createOrderDto.paymentCard);
      }

      return await this.orderService.create(
        date,
        user,
        shippingAddress,
        billingAddress,
        cartItems,
        paymentService,
      );
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

  @Put(':id')
  update(@Param('id') id: number, @Body() order: Order) {
    return this.orderService.update(id, order);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.orderService.delete(id);
  }
}
