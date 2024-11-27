import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShoppingCart } from './shopping_cart.entity';
import { User } from '@modules/user/user.entity';

@Injectable()
export class ShoppingCartService {
  constructor(
    @InjectRepository(ShoppingCart)
    private shopping_cartRepository: Repository<ShoppingCart>,
  ) {}

  async findOneByUser(user: User) {
    return await this.shopping_cartRepository.findOne({
      where: { user: user },
      relations: {
        items: {
          productVariant: true,
        },
      },
    });
  }

  findAll() {
    return this.shopping_cartRepository.find();
  }

  findOne(id: number) {
    return this.shopping_cartRepository.findOne({ where: { id } });
  }

  create(shopping_cart: ShoppingCart) {
    return this.shopping_cartRepository.save(shopping_cart);
  }

  update(id: number, shopping_cart: ShoppingCart) {
    return this.shopping_cartRepository.update(id, shopping_cart);
  }

  delete(id: number) {
    return this.shopping_cartRepository.delete(id);
  }
}
