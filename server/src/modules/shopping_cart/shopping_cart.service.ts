import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShoppingCart } from './shopping_cart.entity';
import { User } from '@modules/user/user.entity';
import { CreateCartItemDto } from './cart_item/dto/create_cart_item.dto';
import { ProductVariantService } from '@modules/product/product_variant/product_variant.service';
import { UserShoppingCartService } from '@modules/user/user-shopping-cart.service';
import { CartItem } from './cart_item/cart_item.entity';

@Injectable()
export class ShoppingCartService {
  constructor(
    @InjectRepository(ShoppingCart)
    private shopping_cartRepository: Repository<ShoppingCart>,
  ) {}

  async create(user: User) {
    return await this.shopping_cartRepository.save({
      user: user,
      createdAt: new Date(),
    });
  }

  findAll() {
    return this.shopping_cartRepository.find();
  }

  findOne(id: number) {
    return this.shopping_cartRepository.findOne({ where: { id } });
  }

  update(id: number, shopping_cart: ShoppingCart) {
    return this.shopping_cartRepository.update(id, shopping_cart);
  }

  delete(id: number) {
    return this.shopping_cartRepository.delete(id);
  }
}
