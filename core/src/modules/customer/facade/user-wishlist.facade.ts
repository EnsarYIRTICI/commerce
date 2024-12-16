import {
  BadGatewayException,
  BadRequestException,
  Injectable,
} from '@nestjs/common';

import { WishlistService } from '@modules/wishlist/wishlist.service';
import { User } from '@modules/user/user.entity';

@Injectable()
export class UserWishlistFacade {
  constructor(
    private readonly wishlistService: WishlistService,
    private readonly user: User,
  ) {}

  async getLists() {
    return await this.wishlistService.findAllByUser(this.user);
  }

  async getListById(id: string) {
    return await this.wishlistService.findOneByUser(this.user, id);
  }

  async createList(name: string) {
    await this.wishlistService.create(this.user, name);
  }

  async deleteList(id: string) {
    await this.wishlistService.deleteOneByUser(this.user, id);
  }
}
