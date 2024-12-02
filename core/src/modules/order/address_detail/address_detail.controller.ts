import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { AddressDetailService } from './address_detail.service';
import { AddressDetail } from './address_detail.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Address Detail')
@Controller('address_details')
export class AddressDetailController {
  constructor(private readonly address_detailService: AddressDetailService) {}

  @Get()
  findAll() {
    return this.address_detailService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.address_detailService.findOne(id);
  }

  @Post()
  create(@Body() address_detail: AddressDetail) {
    return this.address_detailService.create(address_detail);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() address_detail: AddressDetail) {
    return this.address_detailService.update(id, address_detail);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.address_detailService.delete(id);
  }
}
