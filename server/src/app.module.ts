import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import typeorm from '@config/typeorm';

import { RedisService } from 'src/cache/redis.service';

import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/auth.guard';
import { APP_GUARD } from '@nestjs/core';

import { Role } from '@modules/user/role/role.entity';
import { OrderStatus } from '@modules/order/order_status/order_status.entity';
import { Status } from '@modules/user/status/status.entity';
import { Category } from '@modules/product/category/category.entity';
import { User } from '@modules/user/user.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { MinioService } from 'src/storage/minio/minio.service';
import { ProductModule } from '@modules/product/product.module';
import { OrderModule } from '@modules/order/order.module';
import { ShipmentModule } from '@modules/shipment/shipment.module';
import { UserModule } from '@modules/user/user.module';
import { WishlistItemModule } from '@modules/wishlist/wishlist_item/wishlist_item.module';
import { WishlistModule } from '@modules/wishlist/wishlist.module';
import { ShoppingCartModule } from '@modules/shopping_cart/shopping_cart.module';
import { PaymentModule } from '@modules/payment/payment.module';
import { ActivityLog } from '@modules/activity_log/activity_log.entity';
import { ActivityLogModule } from '@modules/activity_log/activity_log.module';
import { CarrierModule } from '@modules/carrier/carrier.module';
import { Address } from '@modules/address/address.entity';
import { AddressModule } from '@modules/address/address.module';
import { SeedService } from './seed/seed.service';

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
    ProductModule,
    OrderModule,
    CarrierModule,
    ShipmentModule,
    PaymentModule,
    WishlistModule,
    ShoppingCartModule,
    ActivityLogModule,
    AddressModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    SeedService,
    RedisService,
    MinioService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  exports: [JwtModule],
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
