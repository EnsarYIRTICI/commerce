import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Subscription } from '@modules/payment/subscription/subscription.entity';
import { RoleModule } from './role/role.module';
import { StatusModule } from './status/status.module';
import { OrderItem } from '@modules/order/order_item/order_item.entity';
import { CartItem } from '@modules/cart_item/entities/cart_item.entity';

@Module({
  imports: [StatusModule, RoleModule, TypeOrmModule.forFeature([User])],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
