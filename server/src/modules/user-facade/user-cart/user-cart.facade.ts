import {
  BadGatewayException,
  BadRequestException,
  Injectable,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServiceNotInitializedException } from 'src/shared/exceptions/service-not-initialized.exception';
import { ProductVariantService } from '@modules/product/product_variant/product_variant.service';
import { CartItem } from '@modules/shopping_cart/cart_item/cart_item.entity';
import { CreateCartItemDto } from '@modules/shopping_cart/cart_item/dto/create_cart_item.dto';
import { CartItemService } from '@modules/shopping_cart/cart_item/cart_item.service';
import { User } from '@modules/user/user.entity';

@Injectable()
export class UserCartFacade {
  constructor(
    private readonly cartItemService: CartItemService,
    private readonly productVariantService: ProductVariantService,
  ) {}

  private user: User;

  init(user: User) {
    this.user = user;
  }

  isInit() {
    if (!this.user) {
      throw new BadRequestException(
        'Shopping cart not initialized for the user.',
      );
    }
  }

  async getItems() {
    this.isInit();

    let totalAmount = 0;

    const cartItems = await this.cartItemService.findAllByUser(this.user);

    for (const item of cartItems) {
      totalAmount += item.quantity * item.productVariant.price;
    }

    return { cartItems, totalAmount };
  }

  async addItem(slug: string) {
    this.isInit();

    let productVariant = await this.productVariantService.findOneBySlug(slug);

    if (!productVariant) {
      throw new BadRequestException(
        'The requested product variant does not exist',
      );
    }

    if (productVariant.stock < 1) {
      throw new BadRequestException(
        'Insufficient stock for the selected product variant',
      );
    }

    let cart_item = await this.cartItemService.validate(
      this.user,
      productVariant,
    );

    if (!cart_item) {
      return await this.cartItemService.create(this.user, productVariant);
    } else {
      return await this.cartItemService.raiseOfQuantity(cart_item);
    }
  }

  async clearItems() {
    this.isInit();

    await this.cartItemService.clearByUser(this.user);
  }
}
