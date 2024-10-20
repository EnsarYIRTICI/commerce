import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import typeorm from './config/typeorm';

import { RedisService } from './redis/redis.service';
import { SeedService } from './seed/seed.service';
import { Status } from './modules/status/status.entity';

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
    TypeOrmModule.forFeature([Status]),
  ],

  controllers: [AppController],
  providers: [AppService, RedisService, SeedService],
  exports: [],
})
export class AppModule {
  constructor(private readonly seedService: SeedService) {}

  async onModuleInit() {
    await this.seedService.seedStatuses();
  }
}
