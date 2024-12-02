import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Subscription } from '@modules/payment/subscription/subscription.entity';
import { RoleModule } from './role/role.module';
import { StatusModule } from './status/status.module';
import { OrderItem } from '@modules/order/order_item/order_item.entity';
import { CartItem } from '@modules/cart_item/cart_item.entity';

import { ProductVariantService } from '@modules/product/product_variant/product_variant.service';
import { ProductVariant } from '@modules/product/product_variant/product_variant.entity';

@Module({
  imports: [StatusModule, RoleModule, TypeOrmModule.forFeature([User])],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
