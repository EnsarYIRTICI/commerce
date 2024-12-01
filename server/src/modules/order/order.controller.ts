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
import { Roles } from 'src/shared/decorators/role.decorator';
import { DataSource, QueryFailedError } from 'typeorm';
import { CreateOrderDto } from './dto/createOrder.dto';
import { errorMessages } from 'src/shared/common/errorMessages';

import { Request } from 'express';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';

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
