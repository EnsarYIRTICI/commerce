import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { PrismaService } from './prisma/prisma.service';
import { RedisService } from './redis/redis.service';

import { readdirSync } from 'fs';
import { join } from 'path';

const modules = readdirSync(join(__dirname, './modules')).map(
  (dir) => require(`./modules/${dir}/${dir}.module`).default,
);

@Module({
  imports: [
    ...modules,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL, // Veritabanı bağlantı URL'sini .env'den alıyoruz
      autoLoadEntities: true, // Entity'leri otomatik olarak yükle
      synchronize: true, // Sadece development aşamasında kullan
    }),
  ],

  controllers: [AppController],
  providers: [AppService, PrismaService, RedisService],
  exports: [PrismaService, RedisService],
})
export class AppModule {}
