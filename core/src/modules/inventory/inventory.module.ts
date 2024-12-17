import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockService } from './service/stock.service';
import { Stock } from './entities/stock.entity';
import { WarehouseModule } from '@modules/warehouse/warehouse.module';
import { StockTService } from './service/stock.t.service';

@Module({
  imports: [WarehouseModule, TypeOrmModule.forFeature([Stock])],
  providers: [StockService, StockTService],
  exports: [StockService, StockTService],
})
export class InventoryModule {}
