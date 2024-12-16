import { BadRequestException, Injectable, OnModuleInit } from '@nestjs/common';
import { getRepositoryToken, InjectRepository } from '@nestjs/typeorm';
import { DataSource, QueryRunner, Repository, TreeRepository } from 'typeorm';
import { ModuleRef } from '@nestjs/core';

import { Category } from '@modules/product/category/category.entity';
import { Role } from '@modules/user/entities/role.entity';
import { OrderStatus } from '@modules/order/order_status/order_status.entity';

import { Status } from '@modules/user/entities/status.entity';
import { User } from '@modules/user/user.entity';
import { RegisterDto } from '@modules/auth/dto/register.dto';
import { Attribute } from '@modules/attribute/entities/attribute.entity';
import { AttributeType } from '@modules/attribute/entities/attribute-type.entity';
import { AttributeValue } from '@modules/attribute/entities/attribute-value.entity';
import { Currency } from '@modules/sku/price/entities/currency.entity';
import { productAttributesJson } from './common/product_attributes';

@Injectable()
export class AttributeSeedService {
  constructor(private readonly dataSource: DataSource) {}

  async product_attribute() {
    const queryRunner: QueryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const attributeType = await queryRunner.manager.findOne(AttributeType, {
        where: { name: 'product' },
      });

      if (!attributeType) {
        throw new BadRequestException('Attribute Type Not Found');
      }

      for (const attributeData of productAttributesJson) {
        const attribute = queryRunner.manager.create(Attribute, {
          type: attributeType,
          id: attributeData.id,
          ...attributeData,
        });
        await queryRunner.manager.save(attribute);

        const values = attributeData.values.map(async (attrValueData) => {
          const attributeValue = queryRunner.manager.create(AttributeValue, {
            attribute,
            id: attrValueData.id,
            ...attrValueData,
          });
          await queryRunner.manager.save(attributeValue);
        });

        await Promise.all(values);
      }

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
