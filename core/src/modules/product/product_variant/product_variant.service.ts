import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, QueryRunner, Repository } from 'typeorm';
import { ProductVariant } from './product_variant.entity';
import { CartItem } from '@modules/cart_item/cart_item.entity';

@Injectable()
export class ProductVariantService {
  constructor(
    @InjectRepository(ProductVariant)
    private product_variantRepository: Repository<ProductVariant>,
  ) {}

  async decreaseStockByCartItems(
    queryRunner: QueryRunner,
    cartItems: CartItem[],
  ) {
    const productVariantIds = cartItems.map((item) => item.productVariant.id);
    const productVariants = await queryRunner.manager.find(ProductVariant, {
      where: { id: In(productVariantIds) },
    });

    productVariants.forEach((variant) => {
      const cartItem = cartItems.find(
        (item) => item.productVariant.id === variant.id,
      );
      if (cartItem) {
        if (variant.stock < cartItem.quantity) {
          throw new BadRequestException(
            `The product variant ${variant.id} is out of stock.`,
          );
        }
        variant.stock -= cartItem.quantity;
      }
    });

    await queryRunner.manager.save(ProductVariant, productVariants);
  }

  async increaseStock(id: number, quantity: number) {
    let productVariant = await this.findOne(id);

    productVariant.stock += quantity;

    return await this.product_variantRepository.update(id, productVariant);
  }

  async decreaseStock(id: number, quantity: number) {
    let productVariant = await this.findOne(id);

    if (productVariant.stock < quantity) {
      productVariant.stock = 0;

      return await this.product_variantRepository.update(id, productVariant);
    }

    productVariant.stock -= quantity;

    return await this.product_variantRepository.update(id, productVariant);
  }

  async findOneBySlug(slug: string) {
    return await this.product_variantRepository.findOne({
      where: {
        slug: slug,
      },
    });
  }

  async findByIds(ids: number[]): Promise<ProductVariant[]> {
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

  async create(product_variant: ProductVariant) {
    return await this.product_variantRepository.save(product_variant);
  }

  async update(id: number, product_variant: ProductVariant) {
    return await this.product_variantRepository.update(id, product_variant);
  }

  async delete(id: number) {
    return await this.product_variantRepository.delete(id);
  }
}
