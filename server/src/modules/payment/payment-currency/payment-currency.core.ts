import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentCurrency } from './payment-currency.entity';
import { PaymentCurrencyService } from './payment-currency.service';
import { PaymentCurrencyController } from './payment-currency.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentCurrency])],
  providers: [PaymentCurrencyService],
  exports: [PaymentCurrencyService],
})
export class PaymentCurrencyCoreModule {}
