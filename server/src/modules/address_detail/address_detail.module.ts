
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressDetail } from './address_detail.entity';
import { AddressDetailService } from './address_detail.service';
import { AddressDetailController } from './address_detail.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AddressDetail])],
  providers: [AddressDetailService],
  controllers: [AddressDetailController],
})
export class AddressDetailModule {}
