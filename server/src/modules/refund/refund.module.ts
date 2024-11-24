import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Refund } from './refund.entity';
import { RefundService } from './refund.service';
import { RefundController } from './refund.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Refund])], // Refund entity'sini ekledik
  providers: [RefundService], // RefundService modülde kullanılabilir
  controllers: [RefundController], // RefundController modülde tanımlı
  exports: [RefundService], // Gerekirse RefundService başka modüllerde kullanılabilir
})
export class RefundModule {}
