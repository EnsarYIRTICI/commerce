import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SKUService } from './sku.service';
import { SKUController } from './sku.controller';
import { SKUCoreModule } from './sku.core';

@Module({
  imports: [SKUCoreModule],
  providers: [],
  controllers: [SKUController],
})
export class SKUModule {}
