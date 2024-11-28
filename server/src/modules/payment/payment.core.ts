import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './payment.entity';
import { CreditCardPaymentService } from './credit-card-payment.service';
import { BKMExpressPaymentService } from './bkm-express-payment.service';
import { BankTransferPaymentService } from './bank-transfer-payment.service';
import { PaymentServiceFactory } from './payment.service.factory';
import { PaymentSharedModule } from './payment.shared';

@Module({
  imports: [TypeOrmModule.forFeature([Payment]), PaymentSharedModule],
  providers: [
    CreditCardPaymentService,
    BKMExpressPaymentService,
    BankTransferPaymentService,
    PaymentServiceFactory,
  ],
  exports: [
    CreditCardPaymentService,
    BKMExpressPaymentService,
    BankTransferPaymentService,
    PaymentServiceFactory,
    TypeOrmModule,
    PaymentSharedModule,
  ],
})
export class PaymentCoreModule {}
