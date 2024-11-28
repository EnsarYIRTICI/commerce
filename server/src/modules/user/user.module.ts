import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Subscription } from '@modules/payment/subscription/subscription.entity';
import { RoleModule } from './role/role.module';
import { StatusModule } from './status/status.module';
import { UserShoppingCartService } from './user-shopping-cart.service';
import { OrderItem } from '@modules/order/order_item/order_item.entity';
import { CartItem } from '@modules/shopping_cart/cart_item/cart_item.entity';
import { ShoppingCartService } from '@modules/shopping_cart/shopping_cart.service';
import { ShoppingCart } from '@modules/shopping_cart/shopping_cart.entity';
import { ProductVariantService } from '@modules/product/product_variant/product_variant.service';
import { ProductVariant } from '@modules/product/product_variant/product_variant.entity';
import { UserSharedModule } from './user.shared';

@Module({
  imports: [
    StatusModule,
    RoleModule,
    TypeOrmModule.forFeature([User, ProductVariant, CartItem, ShoppingCart]),
    UserSharedModule,
  ],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
