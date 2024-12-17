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

import { JwtModule, JwtService } from '@nestjs/jwt';
import { MinioService } from '@modules/storage/minio/minio.service';
import { ProductModule } from '@modules/product/product.module';
import { OrderModule } from '@modules/order/order.module';
import { ShipmentModule } from '@modules/shipment/shipment.module';
import { UserModule } from '@modules/user/user.module';
import { WishlistItemModule } from '@modules/wishlist/wishlist_item/wishlist_item.module';
import { WishlistModule } from '@modules/wishlist/wishlist.module';
import { PaymentModule } from '@modules/payment/payment.module';
import { CartItemModule } from '@modules/cart_item/cart_item.module';
import { BlacklistService } from './modules/cache/blacklist/blacklist.service';
import { SeedModule } from '@modules/seed/seed.module';
import { BlackListModule } from '@modules/cache/blacklist/blacklist.module';
import { UserCoreModule } from '@modules/user/user.core';
import { UserFacadeModule } from '@modules/customer/user-facade.module';
import { SKUModule } from '@modules/sku/sku.module';
import { TestGuard } from '@shared/guard/test.guard';
import { AttributeModule } from '@modules/attribute/attribute.module';

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

    SeedModule,
    AuthModule,
    UserFacadeModule,
    ProductModule,
    SKUModule,
    OrderModule,
    UserModule,
    ShipmentModule,
    PaymentModule,
    UserCoreModule,
    WishlistModule,
    CartItemModule,
    AttributeModule,
    BlackListModule,
  ],
  providers: [
    AppService,
    MinioService,
    // {
    //   provide: APP_GUARD,
    //   useClass: JwtAuthGuard,
    // },
  ],
  controllers: [AppController],
})
export class AppModule {
  constructor(private readonly minioService: MinioService) {}

  async onModuleInit() {
    await this.minioService.testConnection();
  }
}
