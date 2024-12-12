import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductOption } from './entities/product-option.entity';
import { ProductOptionService } from './product-option.service';
import { ProductOptionController } from './product-option.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ProductOption])],
  providers: [ProductOptionService],
  controllers: [ProductOptionController],
  exports: [ProductOptionService],
})
export class ProductOptionModule {}
