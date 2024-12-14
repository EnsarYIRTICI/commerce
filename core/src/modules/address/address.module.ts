import { Module } from '@nestjs/common';
import { AddressController } from './address.controller';
import { AddressCoreModule } from './address.core';

@Module({
  imports: [AddressCoreModule],
  providers: [],
  controllers: [AddressController],
})
export class AddressModule {}
