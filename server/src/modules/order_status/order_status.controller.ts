import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { OrderStatusService } from './order_status.service';

@Controller('order-status')
export class OrderStatusController {
  constructor(private readonly orderStatusService: OrderStatusService) {}

  @Get()
  findAll() {
    return this.orderStatusService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.orderStatusService.findOne(id);
  }

  @Post()
  create(@Body() createOrderStatusDto: { statusName: string; description: string }) {
    return this.orderStatusService.create(createOrderStatusDto.statusName, createOrderStatusDto.description);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.orderStatusService.delete(id);
  }
}