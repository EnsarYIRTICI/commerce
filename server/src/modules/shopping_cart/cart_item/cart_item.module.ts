import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItem } from './cart_item.entity';
import { CartItemService } from './cart_item.service';
import { CartItemController } from './cart_item.controller';
import { CartItemSharedModule } from '../cart_item.shared';

@Module({
  imports: [TypeOrmModule.forFeature([CartItem]), CartItemSharedModule],
  providers: [CartItemService],
  controllers: [CartItemController],
})
export class CartItemModule {}
