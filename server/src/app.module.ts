import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import typeorm from 'src/shared/config/typeorm';

import { RedisService } from '@modules/cache/redis/redis.service';

import { AuthModule } from './modules/auth/auth.module';
import { JwtAuthGuard } from './shared/guard/auth.guard';
import { APP_GUARD } from '@nestjs/core';

import { Role } from '@modules/user/role/role.entity';
import { OrderStatus } from '@modules/order/order_status/order_status.entity';
import { Status } from '@modules/user/status/status.entity';
import { Category } from '@modules/product/category/category.entity';
import { User } from '@modules/user/user.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { MinioService } from '@modules/storage/minio/minio.service';
import { ProductModule } from '@modules/product/product.module';
import { OrderModule } from '@modules/order/order.module';
import { ShipmentModule } from '@modules/shipment/shipment.module';
import { UserModule } from '@modules/user/user.module';
import { WishlistItemModule } from '@modules/wishlist/wishlist_item/wishlist_item.module';
import { WishlistModule } from '@modules/wishlist/wishlist.module';
import { PaymentModule } from '@modules/payment/payment.module';
import { ActivityLog } from '@modules/activity_log/activity_log.entity';
import { ActivityLogModule } from '@modules/activity_log/activity_log.module';
import { Address } from '@modules/address/address.entity';
import { AddressModule } from '@modules/address/address.module';
import { CartItemModule } from '@modules/shopping_cart/cart_item/cart_item.module';
import { BlacklistService } from './modules/cache/blacklist.service';
import { SeedModule } from '@modules/seed/seed.module';

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
    UserModule,
    ProductModule,
    OrderModule,
    ShipmentModule,
    PaymentModule,
    WishlistModule,
    CartItemModule,
    AddressModule,
    ActivityLogModule,
    SeedModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    MinioService,
    RedisService,
    BlacklistService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {
  constructor(
    private readonly redisService: RedisService,
    private readonly minioService: MinioService,
  ) {}

  async onModuleInit() {
    await this.minioService.testConnection();
    await this.redisService.connect();
  }
}
