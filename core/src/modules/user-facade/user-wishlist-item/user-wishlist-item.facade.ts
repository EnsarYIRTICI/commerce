import {
  BadGatewayException,
  BadRequestException,
  Injectable,
} from '@nestjs/common';

import { ProductVariantService } from '@modules/product/product_variant/product_variant.service';

import { WishlistItemService } from '@modules/wishlist/wishlist_item/wishlist_item.service';
import { Wishlist } from '@modules/wishlist/wishlist.entity';
import { CreateWishlistItemDto } from '@modules/wishlist/wishlist_item/dto/create-wishlist-item.dto';

@Injectable()
export class UserWishlistItemFacade {
  constructor(
    private readonly wishlistItemService: WishlistItemService,
    private readonly productVariantService: ProductVariantService,
  ) {}

  private wishlist: Wishlist;

  async init(wishlist: Wishlist) {
    this.wishlist = wishlist;
  }

  isInit() {
    if (!this.wishlist) {
      throw new BadRequestException(
        'Shopping cart not initialized for the user.',
      );
    }
  }

  async getItems() {
    this.isInit();

    return await this.wishlistItemService.findAllByWishlist(this.wishlist);
  }

  async addItem(slug: string) {
    this.isInit();

    let productVariant = await this.productVariantService.findOneBySlug(slug);

    if (!productVariant) {
      throw new BadRequestException(
        'The requested product variant does not exist',
      );
    }

    await this.wishlistItemService.create(this.wishlist, productVariant);
  }

  async deleteItem(id: number) {
    this.isInit();

    await this.wishlistItemService.deleteOneByWishlist(this.wishlist, id);
  }
}
