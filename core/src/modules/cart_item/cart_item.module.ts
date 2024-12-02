import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItem } from './cart_item.entity';
import { CartItemService } from './cart_item.service';
import { CartItemController } from './cart_item.controller';
import { CartItemCoreModule } from './cart_item.core';

@Module({
  imports: [CartItemCoreModule],
  providers: [],
  controllers: [CartItemController],
})
export class CartItemModule {}
