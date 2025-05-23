import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttributeService } from './attribute.service';
import { AttributeController } from './attribute.controller';
import { Attribute } from './entities/attribute.entity';
import { AttributeValue } from './entities/attribute-value.entity';
import { AttributeType } from './entities/attribute-type.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Attribute, AttributeValue, AttributeType]),
  ],
  providers: [AttributeService],
  exports: [AttributeService],
})
export class AttributeCoreModule {}
