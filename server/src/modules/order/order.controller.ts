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
} from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from './order.entity';
import { Roles } from '@decorators/role.decorator';
import { DataSource, QueryFailedError } from 'typeorm';
import { CreateOrderDto } from './dto/createOrderDto';
import { OrderDomainService } from '@modules/order/order.domain';
import { errorMessages } from '@common/errorMessages';

import { Request } from 'express';

@Controller('orders')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly orderDomain: OrderDomainService,
    private readonly dataSource: DataSource,
  ) {}

  @Post()
  async domainCreate(
    @Req() request: Request,
    @Body() createOrderDto: CreateOrderDto,
  ) {
    try {
      return await this.orderDomain.create(request, createOrderDto);
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
  create(@Body() order: Order) {
    return this.orderService.create(order);
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
