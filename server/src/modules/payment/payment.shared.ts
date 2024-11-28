import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './payment.entity';
import { PaymentController } from './payment.controller';
import { SubscriptionModule } from './subscription/subscription.module';
import { InvoiceModule } from './invoice/invoice.module';
import { RefundModule } from './refund/refund.module';
import { IyzicoService } from './iyzico.service';

@Module({
  imports: [],
  providers: [IyzicoService],
  exports: [IyzicoService],
})
export class PaymentSharedModule {}
