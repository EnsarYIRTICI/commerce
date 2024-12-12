import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductOptionValue } from './entities/product-option-value.entity';
import { ProductOptionValueService } from './product-option-value.service';
import { ProductOptionValueController } from './product-option-value.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ProductOptionValue])],
  providers: [ProductOptionValueService],
  controllers: [ProductOptionValueController],
  exports: [ProductOptionValueService],
})
export class ProductOptionValueModule {}
