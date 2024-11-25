
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PriceHistory } from './price_history.entity';

@Injectable()
export class PriceHistoryService {
  constructor(
    @InjectRepository(PriceHistory)
    private price_historyRepository: Repository<PriceHistory>,
  ) {}

  findAll() {
    return this.price_historyRepository.find();
  }

  findOne(id: number) {
    return this.price_historyRepository.findOne({ where: { id } });
  }

  create(price_history: PriceHistory) {
    return this.price_historyRepository.save(price_history);
  }

  update(id: number, price_history: PriceHistory) {
    return this.price_historyRepository.update(id, price_history);
  }

  delete(id: number) {
    return this.price_historyRepository.delete(id);
  }
}
