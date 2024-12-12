import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SKUService } from './sku.service';
import { SKUController } from './sku.controller';
import { SKU } from './entites/sku.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SKU])],
  providers: [SKUService],
  exports: [SKUService],
})
export class SKUCoreModule {}
