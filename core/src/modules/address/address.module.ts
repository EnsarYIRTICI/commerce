import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from './address.entity';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { AddressCoreModule } from './address.core';

@Module({
  imports: [AddressCoreModule],
  providers: [],
  controllers: [AddressController],
})
export class AddressModule {}
