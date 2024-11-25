import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrderItem } from '@modules/order_item/order_item.entity';
import { Address } from '@modules/address/address.entity';
import { AddressService } from '@modules/address/address.service';
import { ProductVariantService } from '@modules/product_variant/product_variant.service';
import { ProductVariant } from '@modules/product_variant/product_variant.entity';
import { IyzicoService } from '@modules/payment/iyzico.service';

@Module({
  imports: [TypeOrmModule.forFeature([Address, ProductVariant, OrderItem])],
  providers: [AddressService, ProductVariantService, IyzicoService],
  exports: [
    TypeOrmModule,
    AddressService,
    ProductVariantService,
    IyzicoService,
  ],
})
export class OrderSharedModule {}
