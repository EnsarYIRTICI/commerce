import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockService } from './service/stock.service';
import { Stock } from './entities/stock.entity';
import { WarehouseModule } from '@modules/warehouse/warehouse.module';

@Module({
  imports: [WarehouseModule, TypeOrmModule.forFeature([Stock])],
  providers: [StockService],
  exports: [StockService],
})
export class InventoryModule {}
