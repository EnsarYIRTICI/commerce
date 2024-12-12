import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, QueryRunner, Repository } from 'typeorm';
import { CartItem } from '@modules/cart_item/cart_item.entity';
import { SKU } from './entites/sku.entity';

@Injectable()
export class SKUService {
  constructor(
    @InjectRepository(SKU)
    private product_variantRepository: Repository<SKU>,
  ) {}

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

  async findOneBySlug(slug: string) {
    return await this.product_variantRepository.findOne({
      where: {
        slug: slug,
      },
    });
  }

  async findByIds(ids: number[]): Promise<SKU[]> {
    return await this.product_variantRepository.find({
      where: {
        id: In(ids),
      },
    });
  }

  async findAll() {
    return await this.product_variantRepository.find();
  }

  async findOne(id: number) {
    return await this.product_variantRepository.findOne({ where: { id } });
  }

  async create(product_variant: SKU) {
    return await this.product_variantRepository.save(product_variant);
  }

  async update(id: number, product_variant: SKU) {
    return await this.product_variantRepository.update(id, product_variant);
  }

  async delete(id: number) {
    return await this.product_variantRepository.delete(id);
  }
}
