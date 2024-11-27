import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShoppingCartService } from './shopping_cart.service';
import { ProductVariantService } from '@modules/product/product_variant/product_variant.service';
import { ShoppingCart } from './shopping_cart.entity';
import { ProductVariant } from '@modules/product/product_variant/product_variant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ShoppingCart, ProductVariant])],
  providers: [ShoppingCartService, ProductVariantService],
  exports: [TypeOrmModule, ShoppingCartService, ProductVariantService],
})
export class CartItemSharedModule {}
