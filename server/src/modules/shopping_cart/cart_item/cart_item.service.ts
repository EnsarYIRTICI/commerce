import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartItem } from './cart_item.entity';
import { User } from '@modules/user/user.entity';
import { CreateCartItemDto } from './dto/create_cart_item.dto';
import { ProductService } from '@modules/product/product.service';
import { ProductVariantService } from '@modules/product/product_variant/product_variant.service';
import { UserService } from '@modules/user/user.service';
import { ProductVariant } from '@modules/product/product_variant/product_variant.entity';

@Injectable()
export class CartItemService {
  constructor(
    @InjectRepository(CartItem)
    private cart_itemRepository: Repository<CartItem>,
  ) {}

  async validate(user: User, productVariant: ProductVariant) {
    return await this.cart_itemRepository.findOne({
      where: { user: user, productVariant: productVariant },
    });
  }

  async create(user: User, productVariant: ProductVariant) {
    return await this.cart_itemRepository.save({
      user: user,
      productVariant: productVariant,
      quantity: 1,
    });
  }

  async deleteByCartId(userId: number): Promise<void> {
    await this.cart_itemRepository.delete({ user: { id: userId } });
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
