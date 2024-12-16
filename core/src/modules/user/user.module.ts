import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserCoreModule } from './user.core';

@Module({
  imports: [UserCoreModule],
  providers: [],
  controllers: [UserController],
})
export class UserModule {}
