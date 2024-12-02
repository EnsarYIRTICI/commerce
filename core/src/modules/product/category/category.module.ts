import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TreeRepository } from 'typeorm';
import { CategoryCoreModule } from './category.core';

@Module({
  imports: [CategoryCoreModule],
  providers: [],
  controllers: [CategoryController],
})
export class CategoryModule {}
