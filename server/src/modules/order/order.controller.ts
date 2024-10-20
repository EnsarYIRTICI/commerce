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
import { OrderService } from './order.service';
import { Order } from './order.entity';
import { Roles } from '@decorators/role.decorator';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Roles('user')
  @Get('my-orders')
  findMyOrders(@Req() request: Request) {
    const userId = request['user'].id;
    return this.orderService.findOrdersByUserId(userId);
  }

  @Get('user/:userId')
  findOrdersByUser(@Param('userId') userId: number) {
    return this.orderService.findOrdersByUserId(userId);
  }

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
