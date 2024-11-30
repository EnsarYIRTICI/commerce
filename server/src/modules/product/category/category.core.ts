import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TreeRepository } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Category, TreeRepository])],
  providers: [CategoryService],
  exports: [CategoryService],
})
export class CategoryCoreModule {}
