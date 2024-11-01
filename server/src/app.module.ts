import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import typeorm from '@config/typeorm';

import { ImportUtil } from '@utils/import.util';
import { RedisService } from '@database/redis/redis.service';
import { SeedService } from '@database/seed/seed.service';

import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/auth.guard';
import { APP_GUARD } from '@nestjs/core';

import { Role } from '@modules/role/role.entity';
import { OrderStatus } from '@modules/order_status/order_status.entity';
import { Status } from '@modules/status/status.entity';
import { Category } from '@modules/category/category.entity';
import { User } from '@modules/user/user.entity';
import { rolesJson } from '@common/roles';
import { statusesJson } from '@common/statuses';
import { order_statusesJson } from '@common/order_statuses';
import { categoriesJson } from '@common/categories';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ProductAttribute } from '@modules/product_attribute/product_attribute.entity';
import { ProductAttributeValue } from '@modules/product_attribute_value/product_attribute_value.entity';
import { productAttributesJson } from '@common/product_attributes';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get('typeorm'),
    }),
    TypeOrmModule.forFeature([Role, Status, Category, OrderStatus, User]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your-secret-key',
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN || '1h' },
    }),
    AuthModule,
    ...ImportUtil.get('module'),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    RedisService,
    SeedService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  exports: [JwtModule],
})
export class AppModule {
  constructor(
    private readonly seedService: SeedService,
    private readonly redisService: RedisService,
  ) {}

  async onModuleInit() {
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

    // for (const items of seedData) {
    //   try {
    //     if (items.type === 'attribute') {
    //       await this.seedService.seedAttribute(
    //         items.entity.attribute,
    //         items.entity.value,
    //         items.data,
    //       );
    //     } else if (items.type === 'tree') {
    //       await this.seedService.seedTree(items.entity.entity, items.data);
    //     } else {
    //       await this.seedService.seed(items.entity.entity, items.data);
    //     }

    //     console.log('--> Seed', items.entity.name);
    //   } catch (error) {
    //     console.log(error.message);
    //   }
    // }

    await this.redisService.connect();

    // for (const items of seedData) {
    //   await this.redisService.set(
    //     items.entity.name,
    //     JSON.stringify(items.data),
    //   );

    //   console.log('--> Cache', items.entity.name);
    // }
  }
}
