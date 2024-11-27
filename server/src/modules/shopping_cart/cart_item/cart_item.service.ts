import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartItem } from './cart_item.entity';
import { User } from '@modules/user/user.entity';
import { ShoppingCartService } from '../shopping_cart.service';
import { CreateCartItemDto } from './dto/create_cart_item.dto';
import { ProductService } from '@modules/product/product.service';
import { ProductVariantService } from '@modules/product/product_variant/product_variant.service';

@Injectable()
export class CartItemService {
  constructor(
    @InjectRepository(CartItem)
    private cart_itemRepository: Repository<CartItem>,

    private readonly shoppingCartService: ShoppingCartService,
    private readonly productVariantService: ProductVariantService,
  ) {}

  findAll() {
    return this.cart_itemRepository.find();
  }

  findOne(id: number) {
    return this.cart_itemRepository.findOne({ where: { id } });
  }

  async create(user: User, createCartItemDto: CreateCartItemDto) {
    let shoppingCart = await this.shoppingCartService.findOneByUser(user);

    if (!shoppingCart) {
      throw new BadRequestException(
        'User does not have an active shopping cart',
      );
    }

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

    let cart_item = await this.cart_itemRepository.findOne({
      where: { shoppingCart: shoppingCart, productVariant: productVariant },
    });

    if (!cart_item) {
      cart_item = this.cart_itemRepository.create({
        shoppingCart: shoppingCart,
        productVariant: productVariant,
      });
    } else {
      cart_item.quantity += 1;
    }

    return await this.cart_itemRepository.save(cart_item);
  }

  update(id: number, cart_item: CartItem) {
    return this.cart_itemRepository.update(id, cart_item);
  }

  delete(id: number) {
    return this.cart_itemRepository.delete(id);
  }
}
