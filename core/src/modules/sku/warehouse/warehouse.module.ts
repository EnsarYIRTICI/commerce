import { Module } from '@nestjs/common';

import { WarehouseController } from './warehouse.controller';
import { WarehouseCoreModule } from './warehouse.core';

@Module({
  imports: [WarehouseCoreModule],
  controllers: [WarehouseController],
})
export class WarehouseModule {}
