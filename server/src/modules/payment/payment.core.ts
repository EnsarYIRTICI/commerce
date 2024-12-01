import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './payment.entity';
import { CreditCardPaymentStrategy } from './payment-strategy/credit-card-payment.strategy';
import { BKMExpressPaymentStrategy } from './payment-strategy/bkm-express-payment.strategy';
import { BankTransferPaymentStrategy } from './payment-strategy/bank-transfer-payment.strategy';
import { PaymentService } from './payment.service';
import { PaymentProcessor } from './payment.processor';
import { IyzicoService } from './payment-system/iyzico/iyzico.service';

@Module({
  imports: [TypeOrmModule.forFeature([Payment])],
  providers: [
    {
      provide: 'PaymentSystem',
      useClass: IyzicoService,
    },
    CreditCardPaymentStrategy,
    BankTransferPaymentStrategy,
    BKMExpressPaymentStrategy,
    PaymentService,
    PaymentProcessor,
  ],
  exports: [
    CreditCardPaymentStrategy,
    BankTransferPaymentStrategy,
    BKMExpressPaymentStrategy,
    PaymentService,
    PaymentProcessor,
  ],
})
export class PaymentCoreModule {}
