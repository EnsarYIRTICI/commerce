import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SKU } from '../entites/sku.entity';
import { Stock } from './entities/stock.entity';

@Injectable()
export class StockService {
  constructor(
    @InjectRepository(Stock)
    private readonly stockRepository: Repository<Stock>,
  ) {}

  async reduceStock(
    skuId: number,
    warehouseId: number,
    quantity: number,
  ): Promise<void> {
    const skuStock = await this.stockRepository.findOne({
      where: { sku: { id: skuId }, warehouse: { id: warehouseId } },
    });

    if (!skuStock || skuStock.stock < quantity) {
      throw new BadRequestException('Insufficient stock');
    }

    skuStock.stock -= quantity;
    await this.stockRepository.save(skuStock);
  }

  // async decreaseStockByCartItems(
  //   queryRunner: QueryRunner,
  //   cartItems: CartItem[],
  // ) {
  //   const SKUIds = cartItems.map((item) => item.SKU.id);
  //   const SKUs = await queryRunner.manager.find(SKU, {
  //     where: { id: In(SKUIds) },
  //   });

  //   SKUs.forEach((variant) => {
  //     const cartItem = cartItems.find(
  //       (item) => item.SKU.id === variant.id,
  //     );
  //     if (cartItem) {
  //       if (variant.stock < cartItem.quantity) {
  //         throw new BadRequestException(
  //           `The product variant ${variant.id} is out of stock.`,
  //         );
  //       }
  //       variant.stock -= cartItem.quantity;
  //     }
  //   });

  //   await queryRunner.manager.save(SKU, SKUs);
  // }

  // async increaseStock(id: number, quantity: number) {
  //   let SKU = await this.findOne(id);

  //   SKU.stock += quantity;

  //   return await this.product_variantRepository.update(id, SKU);
  // }

  // async decreaseStock(id: number, quantity: number) {
  //   let SKU = await this.findOne(id);

  //   if (SKU.stock < quantity) {
  //     SKU.stock = 0;

  //     return await this.product_variantRepository.update(id, SKU);
  //   }

  //   SKU.stock -= quantity;

  //   return await this.product_variantRepository.update(id, SKU);
  // }
}
