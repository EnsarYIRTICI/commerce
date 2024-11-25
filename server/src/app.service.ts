import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@modules/user/user.entity';
import { Role } from '@modules/user/role/role.entity';
import { Status } from '@modules/user/status/status.entity';
import { Repository } from 'typeorm';
import { RegisterDto } from '@auth/dto/register.dto';
import { SeedService } from 'src/cache/seed.service';
import { rolesJson } from '@common/roles';
import { statusesJson } from '@common/statuses';
import { OrderStatus } from '@modules/order/order_status/order_status.entity';
import { order_statusesJson } from '@common/order_statuses';
import { Category } from '@modules/product/category/category.entity';
import { categoriesJson } from '@common/categories';
import { ProductAttribute } from '@modules/product/product_attribute/product_attribute.entity';
import { ProductAttributeValue } from '@modules/product/product_attribute_value/product_attribute_value.entity';
import { productAttributesJson } from '@common/product_attributes';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,

    @InjectRepository(Status)
    private readonly statusRepository: Repository<Status>,

    private readonly seedService: SeedService,
  ) {}

  async findAdmin(email: string) {
    return await this.userRepository.findOne({ where: { email } });
  }

  async createAdmin(registerDto: RegisterDto) {
    const role = await this.roleRepository.findOne({
      where: { name: 'admin' },
    });
    if (!role) {
      throw new Error('User role not found');
    }

    const status = await this.statusRepository.findOne({
      where: { name: 'active' },
    });

    if (!status) {
      throw new Error('Active status not found');
    }

    const user = this.userRepository.create({
      ...registerDto,
      createdAt: new Date(),
      role,
      status,
    });

    return await this.userRepository.save(user);
  }

  async seedData() {
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
          attribute: ProductAttribute,
          value: ProductAttributeValue,
          name: 'ProductAttribute',
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
  }
}
