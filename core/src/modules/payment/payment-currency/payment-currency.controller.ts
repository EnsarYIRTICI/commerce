import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { PaymentCurrencyService } from './payment-currency.service';
import { PaymentCurrency } from './payment-currency.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Payment Currency')
@Controller('payment-currencies')
export class PaymentCurrencyController {
  constructor(
    private readonly paymentCurrencyService: PaymentCurrencyService,
  ) {}

  @Post()
  async create(
    @Body() data: Partial<PaymentCurrency>,
  ): Promise<PaymentCurrency> {
    return this.paymentCurrencyService.create(data);
  }

  @Get()
  async findAll(): Promise<PaymentCurrency[]> {
    return this.paymentCurrencyService.findAll();
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<PaymentCurrency> {
    return this.paymentCurrencyService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Partial<PaymentCurrency>,
  ): Promise<PaymentCurrency> {
    return this.paymentCurrencyService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.paymentCurrencyService.delete(id);
  }
}
