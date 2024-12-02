import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarrierService } from './carrier.service';
import { CarrierController } from './carrier.controller';
import { Carrier } from './carrier.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Carrier])],
  providers: [CarrierService],
  controllers: [CarrierController],
})
export class CarrierModule {}
