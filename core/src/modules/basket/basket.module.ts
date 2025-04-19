import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItem } from './entities/cart_item.entity';
import { BasketService } from './service/basket.service';
import { BasketController } from './controller/basket.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CartItem])],
  providers: [BasketService],
  controllers: [BasketController],
  exports: [BasketService],
})
export class BasketModule {}
