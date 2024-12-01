import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wishlist } from './wishlist.entity';
import { User } from '@modules/user/user.entity';

@Injectable()
export class WishlistService {
  constructor(
    @InjectRepository(Wishlist)
    private wishlistRepository: Repository<Wishlist>,
  ) {}

  async findOneByUser(user: User, id: string) {
    return await this.wishlistRepository.findOne({
      where: {
        user: {
          id: user.id,
        },
        id,
      },
    });
  }

  async findAllByUser(user: User) {
    return await this.wishlistRepository.find({
      where: {
        user: {
          id: user.id,
        },
      },
    });
  }

  async create(user: User, name: string) {
    return await this.wishlistRepository.save({
      name,
      user,
      createdAt: new Date(),
    });
  }

  async deleteOneByUser(user: User, id: string) {
    const wishlist = await this.findOneByUser(user, id);
    return await this.wishlistRepository.delete(wishlist.id);
  }

  findAll() {
    return this.wishlistRepository.find();
  }

  findOne(id: string) {
    return this.wishlistRepository.findOne({ where: { id } });
  }

  update(id: number, wishlist: Wishlist) {
    return this.wishlistRepository.update(id, wishlist);
  }

  delete(id: number) {
    return this.wishlistRepository.delete(id);
  }
}
