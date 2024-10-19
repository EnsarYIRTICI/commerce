
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShoppingCart } from './shopping_cart.entity';

@Injectable()
export class ShoppingCartService {
  constructor(
    @InjectRepository(ShoppingCart)
    private shopping_cartRepository: Repository<ShoppingCart>,
  ) {}

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
