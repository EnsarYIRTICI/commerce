
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentDetail } from './payment_detail.entity';
import { PaymentDetailService } from './payment_detail.service';
import { PaymentDetailController } from './payment_detail.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentDetail])],
  providers: [PaymentDetailService],
  controllers: [PaymentDetailController],
})
export class PaymentDetailModule {}
