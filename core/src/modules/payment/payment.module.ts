import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentCoreModule } from './payment.core';

@Module({
  imports: [PaymentCoreModule],
  providers: [],
  controllers: [PaymentController],
})
export class PaymentModule {}
