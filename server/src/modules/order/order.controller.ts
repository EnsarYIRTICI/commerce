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
import { UserCartFacade } from '@modules/user/user-cart/user-cart.facade';

@ApiBearerAuth()
@ApiTags('Order')
@Controller('orders')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly dataSource: DataSource,
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

  @Put(':id')
  update(@Param('id') id: number, @Body() order: Order) {
    return this.orderService.update(id, order);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.orderService.delete(id);
  }
}
