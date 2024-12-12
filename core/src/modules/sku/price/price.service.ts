import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Price } from './price.entity';

@Injectable()
export class PriceService {
  constructor(
    @InjectRepository(Price)
    private price_historyRepository: Repository<Price>,
  ) {}

  findAll() {
    return this.price_historyRepository.find();
  }

  findOne(id: number) {
    return this.price_historyRepository.findOne({ where: { id } });
  }

  create(price_history: Price) {
    return this.price_historyRepository.save(price_history);
  }

  update(id: number, price_history: Price) {
    return this.price_historyRepository.update(id, price_history);
  }

  delete(id: number) {
    return this.price_historyRepository.delete(id);
  }
}
