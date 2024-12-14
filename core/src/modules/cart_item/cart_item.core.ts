import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItem } from './entities/cart_item.entity';
import { CartItemService } from './cart_item.service';
import { CartItemController } from './cart_item.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CartItem])],
  providers: [CartItemService],
  exports: [CartItemService],
})
export class CartItemCoreModule {}
