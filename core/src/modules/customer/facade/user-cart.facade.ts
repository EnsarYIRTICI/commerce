import {
  BadGatewayException,
  BadRequestException,
  Injectable,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServiceNotInitializedException } from 'src/shared/exceptions/service-not-initialized.exception';
import { CartItem } from '@modules/basket/entities/cart_item.entity';
import { CreateCartItemDto } from '@modules/basket/dto/create_cart_item.dto';
import { User } from '@modules/user/user.entity';
import { SKUService } from '@modules/sku/service/sku.service';
import { BasketService } from '@modules/basket/service/basket.service';

@Injectable()
export class UserCartFacade {
  constructor(
    private readonly basketService: BasketService,
    private readonly skuService: SKUService,
    private readonly user: User,
  ) {}

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

    const cartItems = await this.basketService.findAllByUser(this.user);

    // for (const item of cartItems) {
    //   totalAmount += item.quantity * item.productVariant.price;
    // }

    return { cartItems, totalAmount };
  }

  async addItem(slug: string) {
    this.isInit();

    let productVariant = await this.skuService.findBySlug(slug);

    if (!productVariant) {
      throw new BadRequestException(
        'The requested product variant does not exist',
      );
    }

    // if (productVariant.stock < 1) {
    //   throw new BadRequestException(
    //     'Insufficient stock for the selected product variant',
    //   );
    // }

    let cart_item = await this.basketService.validate(
      this.user,
      productVariant,
    );

    if (!cart_item) {
      return await this.basketService.create(this.user, productVariant);
    } else {
      return await this.basketService.raiseOfQuantity(cart_item);
    }
  }

  async clearItems() {
    this.isInit();

    await this.basketService.clearByUser(this.user);
  }
}
