import { Module } from '@nestjs/common';
import { AddressController } from './user-address.controller';
import { UserAddress } from './entities/user-address.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAddressService } from './address.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserAddress])],
  providers: [UserAddressService],
  controllers: [AddressController],
  exports: [UserAddressService],
})
export class UserAddressModule {}
