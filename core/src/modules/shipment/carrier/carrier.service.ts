import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Carrier } from './carrier.entity';
import { CreateCarrierDto } from './dto/create_carrier.dto';
import { UpdateCarrierDto } from './dto/update.carrier.dto';

@Injectable()
export class CarrierService {
  constructor(
    @InjectRepository(Carrier)
    private carrierRepository: Repository<Carrier>,
  ) {}

  async createCarrier(createCarrierDto: CreateCarrierDto): Promise<Carrier> {
    const carrier = this.carrierRepository.create(createCarrierDto);
    return await this.carrierRepository.save(carrier);
  }

  async getAllCarriers(): Promise<Carrier[]> {
    return this.carrierRepository.find();
  }

  async getCarrierById(id: number): Promise<Carrier> {
    return this.carrierRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async updateCarrier(
    id: number,
    updateCarrierDto: UpdateCarrierDto,
  ): Promise<Carrier> {
    await this.carrierRepository.update(id, updateCarrierDto);
    return this.getCarrierById(id);
  }

  async deleteCarrier(id: number): Promise<void> {
    await this.carrierRepository.delete(id);
  }
}
