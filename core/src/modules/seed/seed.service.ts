import { Injectable, OnModuleInit } from '@nestjs/common';
import { getRepositoryToken, InjectRepository } from '@nestjs/typeorm';
import { DataSource, QueryRunner, Repository, TreeRepository } from 'typeorm';
import { ModuleRef } from '@nestjs/core';
import { IStaticEntity } from './interface/IStaticEntity';
import { ITreeEntity } from './interface/ITreeEntity';
import { Category } from '@modules/product/category/category.entity';
import { categoriesJson } from './common/categories';
import { Role } from '@modules/user/role/role.entity';
import { rolesJson } from './common/roles';
import { OrderStatus } from '@modules/order/order_status/order_status.entity';
import { order_statusesJson } from './common/order_statuses';
import { statusesJson } from './common/statuses';
import { Status } from '@modules/user/status/status.entity';
import { User } from '@modules/user/user.entity';
import { RegisterDto } from '@modules/auth/dto/register.dto';

@Injectable()
export class SeedService {
  constructor(private readonly dataSource: DataSource) {}

  async admin(registerDto: RegisterDto) {
    const queryRunner: QueryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const role = await queryRunner.manager.findOne(Role, {
        where: { name: 'admin' },
      });
      if (!role) {
        throw new Error('User role not found');
      }

      const status = await queryRunner.manager.findOne(Status, {
        where: { name: 'active' },
      });
      if (!status) {
        throw new Error('Active status not found');
      }

      const user = queryRunner.manager.create(User, {
        ...registerDto,
        createdAt: new Date(),
        role,
        status,
      });

      await queryRunner.manager.save(user);

      await queryRunner.commitTransaction();

      return user;
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async category() {
    const queryRunner: QueryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      categoriesJson.map(async (categoryData) => {
        let category = queryRunner.manager.create(Category, categoryData);

        await queryRunner.manager.save(category);

        categoryData.subcategories.map(async (subCategoryData) => {
          let subCategory = queryRunner.manager.create(Category, {
            parent: category,
            ...subCategoryData,
          });

          await queryRunner.manager.save(subCategory);
        });
      });

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async role() {
    await this.base(Role, rolesJson);
  }

  async status() {
    await this.base(Status, statusesJson);
  }

  async order_status() {
    await this.base(OrderStatus, order_statusesJson);
  }

  private async base(
    baseEntity: any,
    array: { id: number; name: string; description: string }[],
  ) {
    const queryRunner: QueryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      array.map(async (data) => {
        let entity = queryRunner.manager.create(baseEntity, data);

        await queryRunner.manager.save(entity);
      });

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
