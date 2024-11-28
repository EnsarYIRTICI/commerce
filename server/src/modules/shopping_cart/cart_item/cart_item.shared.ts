import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShoppingCartService } from '../shopping_cart.service';
import { ProductVariantService } from '@modules/product/product_variant/product_variant.service';
import { ShoppingCart } from '../shopping_cart.entity';
import { ProductVariant } from '@modules/product/product_variant/product_variant.entity';
import { UserService } from '@modules/user/user.service';
import { User } from '@modules/user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ShoppingCart, ProductVariant, User])],
  providers: [ShoppingCartService, ProductVariantService, UserService],
  exports: [
    TypeOrmModule,
    ShoppingCartService,
    ProductVariantService,
    UserService,
  ],
})
export class CartItemSharedModule {}
