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
    RedisService,
    SeedService,

    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  exports: [],
})
export class AppModule {}
