import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductAttributeValue } from './product_attribute_value.entity';
import { ProductAttributeValueService } from './product_attribute_value.service';
import { ProductAttributeValueController } from './product_attribute_value.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ProductAttributeValue])],
  providers: [ProductAttributeValueService],
  controllers: [ProductAttributeValueController],
})
export class ProductAttributeValueModule {}
