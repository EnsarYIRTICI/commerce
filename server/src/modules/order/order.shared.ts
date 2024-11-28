import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrderItem } from './order_item/order_item.entity';

import { Address } from '@modules/address/address.entity';
import { AddressService } from '@modules/address/address.service';
import { ProductVariantService } from '@modules/product/product_variant/product_variant.service';
import { ProductVariant } from '@modules/product/product_variant/product_variant.entity';
import { IyzicoService } from '@modules/payment/iyzico.service';
import { Payment } from '@modules/payment/payment.entity';
import { ShoppingCartService } from '@modules/shopping_cart/shopping_cart.service';
import { ShoppingCart } from '@modules/shopping_cart/shopping_cart.entity';
import { PaymentServiceFactory } from '@modules/payment/payment.service.factory';
import { BankTransferPaymentService } from '@modules/payment/bank-transfer-payment.service';
import { BKMExpressPaymentService } from '@modules/payment/bkm-express-payment.service';
import { CreditCardPaymentService } from '@modules/payment/credit-card-payment.service';
import { PaymentCoreModule } from '@modules/payment/payment.core';
import { CartItem } from '@modules/shopping_cart/cart_item/cart_item.entity';
import { UserShoppingCartService } from '@modules/user/user-shopping-cart.service';
import { User } from '@modules/user/user.entity';
import { OrderItemService } from './order_item/order_item.service';
import { CartItemService } from '@modules/shopping_cart/cart_item/cart_item.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Address,
      ProductVariant,
      OrderItem,
      Payment,
      ShoppingCart,
      CartItem,
    ]),
    PaymentCoreModule,
  ],
  providers: [
    CartItemService,
    AddressService,
    ProductVariantService,
    ShoppingCartService,
    IyzicoService,
    UserShoppingCartService,
  ],
  exports: [
    TypeOrmModule,
    PaymentCoreModule,

    CartItemService,
    AddressService,
    ProductVariantService,
    ShoppingCartService,
    IyzicoService,
    UserShoppingCartService,
  ],
})
export class OrderSharedModule {}
