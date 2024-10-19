
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wishlist } from './wishlist.entity';

@Injectable()
export class WishlistService {
  constructor(
    @InjectRepository(Wishlist)
    private wishlistRepository: Repository<Wishlist>,
  ) {}

  findAll() {
    return this.wishlistRepository.find();
  }

  findOne(id: number) {
    return this.wishlistRepository.findOne({ where: { id } });
  }

  create(wishlist: Wishlist) {
    return this.wishlistRepository.save(wishlist);
  }

  update(id: number, wishlist: Wishlist) {
    return this.wishlistRepository.update(id, wishlist);
  }

  delete(id: number) {
    return this.wishlistRepository.delete(id);
  }
}
