import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from '@modules/user/role/role.entity';
import { Status } from '@modules/user/status/status.entity';
import { Category } from '@modules/product/category/category.entity';
import { OrderStatus } from '@modules/order/order_status/order_status.entity';
import { User } from '@modules/user/user.entity';
import { UserCoreModule } from '@modules/user/user.core';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from '@modules/user/user.service';

@Module({
  imports: [
    JwtModule,
    TypeOrmModule.forFeature([User, Role, Status, Category, OrderStatus]),
  ],
  providers: [SeedService, UserService],
  controllers: [SeedController],
})
export class SeedModule {}
