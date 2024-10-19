
import { Controller, Get, Post, Param, Body, Put, Delete } from '@nestjs/common';
import { PaymentDetailService } from './payment_detail.service';
import { PaymentDetail } from './payment_detail.entity';

@Controller('payment_details')
export class PaymentDetailController {
  constructor(private readonly payment_detailService: PaymentDetailService) {}

  @Get()
  findAll() {
    return this.payment_detailService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.payment_detailService.findOne(id);
  }

  @Post()
  create(@Body() payment_detail: PaymentDetail) {
    return this.payment_detailService.create(payment_detail);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() payment_detail: PaymentDetail) {
    return this.payment_detailService.update(id, payment_detail);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.payment_detailService.delete(id);
  }
}
