import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { Wishlist } from './wishlist.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Wishlist')
@Controller('wishlists')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Get()
  findAll() {
    return this.wishlistService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.wishlistService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() wishlist: Wishlist) {
    return this.wishlistService.update(id, wishlist);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.wishlistService.delete(id);
  }
}
