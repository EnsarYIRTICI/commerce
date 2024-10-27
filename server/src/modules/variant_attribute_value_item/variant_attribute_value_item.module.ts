import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VariantAttributeValueItem } from './variant_attribute_value_item.entity';
import { VariantAttributeValueItemService } from './variant_attribute_value_item.service';
import { VariantAttributeValueItemController } from './variant_attribute_value_item.controller';

@Module({
  imports: [TypeOrmModule.forFeature([VariantAttributeValueItem])],
  providers: [VariantAttributeValueItemService],
  controllers: [VariantAttributeValueItemController],
  exports: [VariantAttributeValueItemService],
})
export class VariantAttributeValueItemModule {}
