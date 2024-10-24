import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import typeorm from '@config/typeorm';

import { ImportService } from '@utils/import.service';
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
    AuthModule,
    ...ImportService.getModules(),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    SeedService,
    RedisService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  exports: [],
})
export class AppModule {
  constructor(private readonly seedService: SeedService) {}

  async onModuleInit() {
    const seedData = [
      {
        entity: Role,
        data: rolesJson,
      },
      {
        entity: Status,
        data: statusesJson,
      },
      {
        entity: OrderStatus,
        data: order_statusesJson,
      },
      {
        entity: Category,
        data: categoriesJson,
        type: 'tree',
      },
    ];

    for (const items of seedData) {
      if (items.type === 'tree') {
        await this.seedService.seedTree(items.entity, items.data);
      } else {
        await this.seedService.seed(items.entity, items.data);
      }
    }
  }
}
