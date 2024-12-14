import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Price } from './price.entity';

@Injectable()
export class PriceService {
  constructor(
    @InjectRepository(Price)
    private priceServiceRepository: Repository<Price>,
  ) {}

  findAll() {
    return this.priceServiceRepository.find();
  }

  findOne(id: number) {
    return this.priceServiceRepository.findOne({ where: { id } });
  }

  create(price: Price) {
    return this.priceServiceRepository.save(price);
  }

  update(id: number, price: Price) {
    return this.priceServiceRepository.update(id, price);
  }

  delete(id: number) {
    return this.priceServiceRepository.delete(id);
  }
}
