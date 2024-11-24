import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { PaymentMethodService } from './payment_method.service';
import {
  CreatePaymentMethodDto,
  UpdatePaymentMethodDto,
} from './dto/create_payment_method.dto';
import { PaymentMethod } from './payment_method.entity';

@Controller('payment-methods')
export class PaymentMethodController {
  constructor(private readonly paymentMethodService: PaymentMethodService) {}

  @Post()
  create(
    @Body() createPaymentMethodDto: CreatePaymentMethodDto,
  ): Promise<PaymentMethod> {
    return this.paymentMethodService.create(createPaymentMethodDto);
  }

  @Get()
  findAll(): Promise<PaymentMethod[]> {
    return this.paymentMethodService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<PaymentMethod> {
    return this.paymentMethodService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updatePaymentMethodDto: UpdatePaymentMethodDto,
  ): Promise<PaymentMethod> {
    return this.paymentMethodService.update(id, updatePaymentMethodDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.paymentMethodService.remove(id);
  }
}
