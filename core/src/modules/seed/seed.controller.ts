import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
  InternalServerErrorException,
} from '@nestjs/common';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { OrderStatus } from '@modules/order/order_status/order_status.entity';
import { Category } from '@modules/product/category/category.entity';

import { SeedService } from './seed.service';
import { Role } from '@modules/user/role/role.entity';
import { Status } from '@modules/user/status/status.entity';
import { rolesJson } from './common/roles';
import { statusesJson } from './common/statuses';
import { order_statusesJson } from './common/order_statuses';
import { categoriesJson } from './common/categories';
import { productAttributesJson } from './common/product_attributes';
import { Attribute } from '@modules/attribute/entities/attribute.entity';
import { AttributeValue } from '@modules/attribute/entities/attribute-value.entity';

@ApiBearerAuth()
@ApiTags('Seed')
@Controller('seeds')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get('/seed')
  async seed() {
    try {
      const seedData = [
        {
          entity: {
            entity: Role,
            name: 'Role',
          },
          data: rolesJson,
        },
        {
          entity: {
            entity: Status,
            name: 'Status',
          },
          data: statusesJson,
        },
        {
          entity: {
            entity: OrderStatus,
            name: 'OrderStatus',
          },
          data: order_statusesJson,
        },
        {
          entity: {
            entity: Category,
            name: 'Category',
          },
          data: categoriesJson,
          type: 'tree',
        },
        {
          entity: {
            attribute: Attribute,
            value: AttributeValue,
            name: 'Attribute',
          },
          data: productAttributesJson,
          type: 'attribute',
        },
      ];

      for (const items of seedData) {
        try {
          if (items.type === 'attribute') {
            await this.seedService.seedAttribute(
              items.entity.attribute,
              items.entity.value,
              items.data,
            );
          } else if (items.type === 'tree') {
            await this.seedService.seedTree(items.entity.entity, items.data);
          } else {
            await this.seedService.seed(items.entity.entity, items.data);
          }

          console.log('--> Seed', items.entity.name);
        } catch (error) {
          console.log(error.message);
        }
      }
    } catch (error) {
      console.log(error);

      throw new InternalServerErrorException();
    }
  }
}
