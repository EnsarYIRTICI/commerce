import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Subscription } from '@modules/payment/subscription/subscription.entity';
import { RoleModule } from './role/role.module';
import { StatusModule } from './status/status.module';
import { UserCartFacade } from './user-cart/user-cart.facade';
import { UserOrderFacade } from './user-order/user-order.facade';
import { OrderItem } from '@modules/order/order_item/order_item.entity';
import { CartItem } from '@modules/shopping_cart/cart_item/cart_item.entity';
import { ShoppingCartService } from '@modules/shopping_cart/shopping_cart.service';
import { ShoppingCart } from '@modules/shopping_cart/shopping_cart.entity';
import { ProductVariantService } from '@modules/product/product_variant/product_variant.service';
import { ProductVariant } from '@modules/product/product_variant/product_variant.entity';
import { CartItemService } from '@modules/shopping_cart/cart_item/cart_item.service';
import { UserCartModule } from './user-cart/user-cart.module';
import { UserOrderModule } from './user-order/user-order.module';

@Module({
  imports: [UserCartModule, UserOrderModule],
  exports: [UserCartModule, UserOrderModule],
})
export class UserSharedModule {}
