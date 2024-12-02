import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentCurrency } from './payment-currency.entity';
import { PaymentCurrencyService } from './payment-currency.service';
import { PaymentCurrencyController } from './payment-currency.controller';
import { PaymentCurrencyCoreModule } from './payment-currency.core';

@Module({
  imports: [PaymentCurrencyCoreModule],
  providers: [],
  controllers: [PaymentCurrencyController],
})
export class PaymentCurrencyModule {}
