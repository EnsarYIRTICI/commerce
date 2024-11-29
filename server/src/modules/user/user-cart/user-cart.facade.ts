import {
  BadGatewayException,
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { User } from '../user.entity';
import { ShoppingCart } from '../../shopping_cart/shopping_cart.entity';
import { ShoppingCartService } from '../../shopping_cart/shopping_cart.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServiceNotInitializedException } from 'src/exceptions/service-not-initialized.exception';
import { ProductVariantService } from '@modules/product/product_variant/product_variant.service';
import { CartItem } from '@modules/shopping_cart/cart_item/cart_item.entity';
import { CreateCartItemDto } from '@modules/shopping_cart/cart_item/dto/create_cart_item.dto';
import { CartItemService } from '@modules/shopping_cart/cart_item/cart_item.service';

@Injectable()
export class UserCartFacade {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    private readonly cartItemService: CartItemService,
    private readonly shoppingCartService: ShoppingCartService,
    private readonly productVariantService: ProductVariantService,
  ) {}

  private user: User;

  async init(user: User) {
    this.user = user;
  }

  async getItems() {
    this.user = await this.userRepository.findOne({
      where: {
        id: this.user.id,
      },
      relations: {
        shoppingCart: {
          items: {
            productVariant: {
              product: {
                categories: true,
              },
            },
          },
        },
      },
    });

    if (!this.user.shoppingCart) {
      this.user.shoppingCart = await this.shoppingCartService.create(this.user);
    }

    return this.user.shoppingCart;
  }

  async addItem(createCartItemDto: CreateCartItemDto) {
    let shoppingCart = this.user.shoppingCart;

    let productVariant = await this.productVariantService.findOneBySlug(
      createCartItemDto.slug,
    );

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
      shoppingCart,
      productVariant,
    );

    if (!cart_item) {
      return await this.cartItemService.create(shoppingCart, productVariant);
    } else {
      return await this.cartItemService.raiseOfQuantity(cart_item);
    }
  }
}
