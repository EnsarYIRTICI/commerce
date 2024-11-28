import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartItem } from './cart_item.entity';
import { User } from '@modules/user/user.entity';
import { ShoppingCartService } from '../shopping_cart.service';
import { CreateCartItemDto } from './dto/create_cart_item.dto';
import { ProductService } from '@modules/product/product.service';
import { ProductVariantService } from '@modules/product/product_variant/product_variant.service';
import { UserService } from '@modules/user/user.service';
import { UserShoppingCartService } from '@modules/user/user-shopping-cart.service';
import { ShoppingCart } from '../shopping_cart.entity';
import { ProductVariant } from '@modules/product/product_variant/product_variant.entity';

@Injectable()
export class CartItemService {
  constructor(
    @InjectRepository(CartItem)
    private cart_itemRepository: Repository<CartItem>,
  ) {}

  async validate(shoppingCart: ShoppingCart, productVariant: ProductVariant) {
    return await this.cart_itemRepository.findOne({
      where: { shoppingCart: shoppingCart, productVariant: productVariant },
    });
  }

  async create(shoppingCart: ShoppingCart, productVariant: ProductVariant) {
    return await this.cart_itemRepository.save({
      shoppingCart: shoppingCart,
      productVariant: productVariant,
      quantity: 1,
    });
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
