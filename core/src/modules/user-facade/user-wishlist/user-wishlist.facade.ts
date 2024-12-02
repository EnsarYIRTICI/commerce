import {
  BadGatewayException,
  BadRequestException,
  Injectable,
} from '@nestjs/common';

import { WishlistService } from '@modules/wishlist/wishlist.service';
import { User } from '@modules/user/user.entity';

@Injectable()
export class UserWishlistFacade {
  constructor(private readonly wishlistService: WishlistService) {}

  private user: User;

  async init(user: User) {
    this.user = user;
  }

  isInit() {
    if (!this.user) {
      throw new BadRequestException(
        'Shopping cart not initialized for the user.',
      );
    }
  }

  async getLists() {
    this.isInit();

    return await this.wishlistService.findAllByUser(this.user);
  }

  async getListById(id: string) {
    this.isInit();

    return await this.wishlistService.findOneByUser(this.user, id);
  }

  async createList(name: string) {
    this.isInit();

    await this.wishlistService.create(this.user, name);
  }

  async deleteList(id: string) {
    this.isInit();

    await this.wishlistService.deleteOneByUser(this.user, id);
  }
}
