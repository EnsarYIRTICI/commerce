import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './payment.entity';
import { PaymentController } from './payment.controller';
import { SubscriptionModule } from './subscription/subscription.module';
import { InvoiceModule } from './invoice/invoice.module';
import { RefundModule } from './refund/refund.module';
import { PaymentSharedModule } from './payment.shared';
import { CreditCardPaymentService } from './credit-card-payment.service';
import { BKMExpressPaymentService } from './bkm-express-payment.service';
import { BankTransferPaymentService } from './bank-transfer-payment.service';
import { PaymentServiceFactory } from './payment.service.factory';
import { PaymentCoreModule } from './payment.core';

@Module({
  imports: [PaymentCoreModule],
  controllers: [PaymentController],
})
export class PaymentModule {}
