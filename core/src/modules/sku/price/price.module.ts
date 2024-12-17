import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PriceService } from './service/price.service';
import { Currency } from './entities/currency.entity';
import { Price } from './entities/price.entity';
import { PriceTService } from './service/price.t.service';

@Module({
  imports: [TypeOrmModule.forFeature([Price, Currency])],
  providers: [PriceService, PriceTService],
  exports: [PriceService, PriceTService],
})
export class PriceModule {}
