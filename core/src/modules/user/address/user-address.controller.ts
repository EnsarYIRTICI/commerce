import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
  Req,
} from '@nestjs/common';
import { UserAddressService } from './address.service';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateAddressDto } from './dto/createAddress.dto';
import { Request } from 'express';
import { User } from '@modules/user/user.entity';
import { UserAddress } from './entities/user-address.entity';

@ApiBearerAuth()
@ApiTags('Address')
@Controller('addresses')
export class AddressController {
  constructor(private readonly addressService: UserAddressService) {}

  @Get()
  findAll() {
    return this.addressService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.addressService.findOne(id);
  }

  @Post()
  @ApiBody({ type: CreateAddressDto })
  async create(
    @Req() req: Request,
    @Body() createAddressDto: CreateAddressDto,
  ) {
    const user: User = req['user'];
    return await this.addressService.create(createAddressDto, user);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() address: UserAddress) {
    return this.addressService.update(id, address);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.addressService.delete(id);
  }
}
