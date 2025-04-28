import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './payment.entity';
import { CreditCardPaymentStrategy } from './payment-strategy/credit-card-payment.strategy';
import { BKMExpressPaymentStrategy } from './payment-strategy/bkm-express-payment.strategy';
import { BankTransferPaymentStrategy } from './payment-strategy/bank-transfer-payment.strategy';
import { PaymentService } from './payment.service';
import { PaymentProcessor } from './payment.processor';
import { IyzicoUtil } from '@shared/utils/iyzico.util';
import { InfrastructureModule } from '@modules/infrastructure/infrastructure.module';

@Module({
  imports: [InfrastructureModule, TypeOrmModule.forFeature([Payment])],
  providers: [
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
