
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PriceHistory } from './price_history.entity';
import { PriceHistoryService } from './price_history.service';
import { PriceHistoryController } from './price_history.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PriceHistory])],
  providers: [PriceHistoryService],
  controllers: [PriceHistoryController],
})
export class PriceHistoryModule {}
