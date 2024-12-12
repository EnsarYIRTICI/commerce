import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttributeService } from './attribute.service';
import { AttributeController } from './attribute.controller';
import { Attribute } from './entities/attribute.entity';
import { AttributeValue } from './entities/attribute-value.entity';
import { AttributeCoreModule } from './attribute.core';

@Module({
  imports: [AttributeCoreModule],
  providers: [],
  controllers: [AttributeController],
})
export class AttributeModule {}
