import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PriceService } from './service/price.service';
import { Currency } from './entities/currency.entity';
import { Price } from './entities/price.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Price, Currency])],
  providers: [PriceService],
  exports: [PriceService],
})
export class PriceModule {}
