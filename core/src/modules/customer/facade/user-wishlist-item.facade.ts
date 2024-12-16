import {
  BadGatewayException,
  BadRequestException,
  Injectable,
} from '@nestjs/common';

import { WishlistItemService } from '@modules/wishlist/wishlist_item/wishlist_item.service';
import { Wishlist } from '@modules/wishlist/wishlist.entity';
import { CreateWishlistItemDto } from '@modules/wishlist/wishlist_item/dto/create-wishlist-item.dto';
import { SKUService } from '@modules/sku/service/sku.service';

@Injectable()
export class UserWishlistItemFacade {
  constructor(
    private readonly wishlistItemService: WishlistItemService,
    private readonly skuService: SKUService,
    private readonly wishlist: Wishlist,
  ) {}

  async getItems() {
    return await this.wishlistItemService.findAllByWishlist(this.wishlist);
  }

  async addItem(slug: string) {
    let productVariant = await this.skuService.findBySlug(slug);

    if (!productVariant) {
      throw new BadRequestException(
        'The requested product variant does not exist',
      );
    }

    await this.wishlistItemService.create(this.wishlist, productVariant);
  }

  async deleteItem(id: number) {
    await this.wishlistItemService.deleteOneByWishlist(this.wishlist, id);
  }
}
