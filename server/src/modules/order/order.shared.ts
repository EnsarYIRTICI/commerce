import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrderItem } from './order_item/order_item.entity';

import { Address } from '@modules/address/address.entity';
import { AddressService } from '@modules/address/address.service';
import { ProductVariantService } from '@modules/product/product_variant/product_variant.service';
import { ProductVariant } from '@modules/product/product_variant/product_variant.entity';
import { IyzicoService } from '@modules/payment/iyzico.service';
import { PaymentService } from '@modules/payment/payment.service';
import { Payment } from '@modules/payment/payment.entity';
import { ShoppingCartService } from '@modules/shopping_cart/shopping_cart.service';
import { ShoppingCart } from '@modules/shopping_cart/shopping_cart.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Address,
      ProductVariant,
      OrderItem,
      Payment,
      ShoppingCart,
    ]),
  ],
  providers: [
    AddressService,
    ProductVariantService,
    PaymentService,
    IyzicoService,
    ShoppingCartService,
  ],
  exports: [
    TypeOrmModule,
    AddressService,
    ProductVariantService,
    PaymentService,
    IyzicoService,
    ShoppingCartService,
  ],
})
export class OrderSharedModule {}
