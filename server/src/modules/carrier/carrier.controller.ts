import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { CarrierService } from './carrier.service';
import { Carrier } from './carrier.entity';
import { CreateCarrierDto } from './dto/create_carrier.dto';
import { UpdateCarrierDto } from './dto/update.carrier.dto';

@Controller('carriers')
export class CarrierController {
  constructor(private readonly carrierService: CarrierService) {}

  @Post()
  create(@Body() createCarrierDto: CreateCarrierDto): Promise<Carrier> {
    return this.carrierService.createCarrier(createCarrierDto);
  }

  @Get()
  findAll(): Promise<Carrier[]> {
    return this.carrierService.getAllCarriers();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Carrier> {
    return this.carrierService.getCarrierById(id);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateCarrierDto: UpdateCarrierDto,
  ): Promise<Carrier> {
    return this.carrierService.updateCarrier(id, updateCarrierDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.carrierService.deleteCarrier(id);
  }
}
