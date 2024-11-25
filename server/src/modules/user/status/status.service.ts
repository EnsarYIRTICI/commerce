
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Status } from './status.entity';

@Injectable()
export class StatusService {
  constructor(
    @InjectRepository(Status)
    private statusRepository: Repository<Status>,
  ) {}

  findAll() {
    return this.statusRepository.find();
  }

  findOne(id: number) {
    return this.statusRepository.findOne({ where: { id } });
  }

  create(status: Status) {
    return this.statusRepository.save(status);
  }

  update(id: number, status: Status) {
    return this.statusRepository.update(id, status);
  }

  delete(id: number) {
    return this.statusRepository.delete(id);
  }
}
