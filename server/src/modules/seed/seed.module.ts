import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from '@modules/user/role/role.entity';
import { Status } from '@modules/user/status/status.entity';
import { Category } from '@modules/product/category/category.entity';
import { OrderStatus } from '@modules/order/order_status/order_status.entity';
import { User } from '@modules/user/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Role, Status, Category, OrderStatus, User]),
  ],
  providers: [SeedService],
  controllers: [SeedController],
})
export class SeedModule {}
