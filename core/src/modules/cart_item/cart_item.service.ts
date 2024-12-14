import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartItem } from './entities/cart_item.entity';
import { User } from '@modules/user/user.entity';
import { CreateCartItemDto } from './dto/create_cart_item.dto';
import { ProductService } from '@modules/product/product.service';
import { UserService } from '@modules/user/user.service';
import { SKU } from '@modules/sku/entites/sku.entity';

@Injectable()
export class CartItemService {
  constructor(
    @InjectRepository(CartItem)
    private cart_itemRepository: Repository<CartItem>,
  ) {}

  async findAllByUser(user: User) {
    return await this.cart_itemRepository.find({
      where: {
        user: {
          id: user.id,
        },
      },
      relations: {
        productVariant: {
          product: {
            categories: true,
          },
        },
      },
    });
  }

  async validate(user: User, productVariant: SKU) {
    return await this.cart_itemRepository.findOne({
      where: {
        user: {
          id: user.id,
        },
        productVariant: productVariant,
      },
    });
  }

  async create(user: User, productVariant: SKU) {
    return await this.cart_itemRepository.save({
      user: user,
      productVariant: productVariant,
      quantity: 1,
    });
  }

  async clearByUser(user: User): Promise<void> {
    await this.cart_itemRepository.delete({ user: { id: user.id } });
  }

  async raiseOfQuantity(cart_item: CartItem) {
    cart_item.quantity += 1;
    return await this.cart_itemRepository.save(cart_item);
  }

  findAll() {
    return this.cart_itemRepository.find();
  }

  findOne(id: number) {
    return this.cart_itemRepository.findOne({ where: { id } });
  }

  update(id: number, cart_item: CartItem) {
    return this.cart_itemRepository.update(id, cart_item);
  }

  delete(id: number) {
    return this.cart_itemRepository.delete(id);
  }
}
