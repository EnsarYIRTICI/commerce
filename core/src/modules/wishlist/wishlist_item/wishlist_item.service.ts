import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WishlistItem } from './wishlist_item.entity';
import { Wishlist } from '../wishlist.entity';
import { SKU } from '@modules/sku/entites/sku.entity';

@Injectable()
export class WishlistItemService {
  constructor(
    @InjectRepository(WishlistItem)
    private wishlist_itemRepository: Repository<WishlistItem>,
  ) {}

  async findOneByWishlist(wishlist: Wishlist, id: number) {
    return await this.wishlist_itemRepository.findOne({
      where: {
        id,
        wishlist: {
          id: wishlist.id,
        },
      },
    });
  }

  async findAllByWishlist(wishlist: Wishlist) {
    return await this.wishlist_itemRepository.find({
      where: {
        wishlist: {
          id: wishlist.id,
        },
      },
      relations: {
        productVariant: true,
      },
    });
  }

  async create(wishlist: Wishlist, productVariant: SKU) {
    return await this.wishlist_itemRepository.save({
      productVariant,
      wishlist,
    });
  }

  async deleteOneByWishlist(wishlist: Wishlist, id: number) {
    const wishlistItem = await this.findOneByWishlist(wishlist, id);
    return await this.wishlist_itemRepository.delete(wishlistItem.id);
  }

  findAll() {
    return this.wishlist_itemRepository.find();
  }

  findOne(id: number) {
    return this.wishlist_itemRepository.findOne({ where: { id } });
  }

  update(id: number, wishlist_item: WishlistItem) {
    return this.wishlist_itemRepository.update(id, wishlist_item);
  }

  delete(id: number) {
    return this.wishlist_itemRepository.delete(id);
  }
}
