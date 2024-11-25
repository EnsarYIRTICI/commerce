
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductAttribute } from './product_attribute.entity';
import { ProductAttributeService } from './product_attribute.service';
import { ProductAttributeController } from './product_attribute.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ProductAttribute])],
  providers: [ProductAttributeService],
  controllers: [ProductAttributeController],
})
export class ProductAttributeModule {}
