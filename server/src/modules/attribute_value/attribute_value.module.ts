
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttributeValue } from './attribute_value.entity';
import { AttributeValueService } from './attribute_value.service';
import { AttributeValueController } from './attribute_value.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AttributeValue])],
  providers: [AttributeValueService],
  controllers: [AttributeValueController],
})
export class AttributeValueModule {}
