
import { Controller, Get, Post, Param, Body, Put, Delete } from '@nestjs/common';
import { AddressService } from './address.service';
import { Address } from './address.entity';

@Controller('addresses')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get()
  findAll() {
    return this.addressService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.addressService.findOne(id);
  }

  @Post()
  create(@Body() address: Address) {
    return this.addressService.create(address);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() address: Address) {
    return this.addressService.update(id, address);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.addressService.delete(id);
  }
}
