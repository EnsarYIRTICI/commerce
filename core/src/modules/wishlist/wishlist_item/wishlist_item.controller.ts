import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { WishlistItemService } from './wishlist_item.service';
import { WishlistItem } from './wishlist_item.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Wishlist Item')
@Controller('wishlist_items')
export class WishlistItemController {
  constructor(private readonly wishlist_itemService: WishlistItemService) {}

  @Get()
  findAll() {
    return this.wishlist_itemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.wishlist_itemService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() wishlist_item: WishlistItem) {
    return this.wishlist_itemService.update(id, wishlist_item);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.wishlist_itemService.delete(id);
  }
}
