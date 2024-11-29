import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductVariantService } from '@modules/product/product_variant/product_variant.service';
import { ProductVariant } from '@modules/product/product_variant/product_variant.entity';
import { UserService } from '@modules/user/user.service';
import { User } from '@modules/user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductVariant, User])],
  providers: [ProductVariantService, UserService],
  exports: [TypeOrmModule, ProductVariantService, UserService],
})
export class CartItemSharedModule {}
