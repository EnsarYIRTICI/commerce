
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WishlistItem } from './wishlist_item.entity';

@Injectable()
export class WishlistItemService {
  constructor(
    @InjectRepository(WishlistItem)
    private wishlist_itemRepository: Repository<WishlistItem>,
  ) {}

  findAll() {
    return this.wishlist_itemRepository.find();
  }

  findOne(id: number) {
    return this.wishlist_itemRepository.findOne({ where: { id } });
  }

  create(wishlist_item: WishlistItem) {
    return this.wishlist_itemRepository.save(wishlist_item);
  }

  update(id: number, wishlist_item: WishlistItem) {
    return this.wishlist_itemRepository.update(id, wishlist_item);
  }

  delete(id: number) {
    return this.wishlist_itemRepository.delete(id);
  }
}
