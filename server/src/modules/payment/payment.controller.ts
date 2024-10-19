
import { Controller, Get, Post, Param, Body, Put, Delete } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { Payment } from './payment.entity';

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get()
  findAll() {
    return this.paymentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.paymentService.findOne(id);
  }

  @Post()
  create(@Body() payment: Payment) {
    return this.paymentService.create(payment);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() payment: Payment) {
    return this.paymentService.update(id, payment);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.paymentService.delete(id);
  }
}
