import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import typeorm from '@config/typeorm';

import { ImportService } from '@utils/import/import.service';
import { RedisService } from '@database/redis/redis.service';
import { SeedService } from '@database/seed/seed.service';

import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ...new ImportService().getModules(), // Dinamik modülleri ekliyoruz
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get('typeorm'),
    }),
    TypeOrmModule.forFeature([...new ImportService().getEntities()]), // Dinamik entity'leri ekliyoruz
  ],
  controllers: [AppController],
  providers: [AppService, RedisService, SeedService],
  exports: [],
})
export class AppModule {}
