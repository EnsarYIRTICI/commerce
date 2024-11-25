
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartItem } from './cart_item.entity';

@Injectable()
export class CartItemService {
  constructor(
    @InjectRepository(CartItem)
    private cart_itemRepository: Repository<CartItem>,
  ) {}

  findAll() {
    return this.cart_itemRepository.find();
  }

  findOne(id: number) {
    return this.cart_itemRepository.findOne({ where: { id } });
  }

  create(cart_item: CartItem) {
    return this.cart_itemRepository.save(cart_item);
  }

  update(id: number, cart_item: CartItem) {
    return this.cart_itemRepository.update(id, cart_item);
  }

  delete(id: number) {
    return this.cart_itemRepository.delete(id);
  }
}
