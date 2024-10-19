
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddressDetail } from './address_detail.entity';

@Injectable()
export class AddressDetailService {
  constructor(
    @InjectRepository(AddressDetail)
    private address_detailRepository: Repository<AddressDetail>,
  ) {}

  findAll() {
    return this.address_detailRepository.find();
  }

  findOne(id: number) {
    return this.address_detailRepository.findOne({ where: { id } });
  }

  create(address_detail: AddressDetail) {
    return this.address_detailRepository.save(address_detail);
  }

  update(id: number, address_detail: AddressDetail) {
    return this.address_detailRepository.update(id, address_detail);
  }

  delete(id: number) {
    return this.address_detailRepository.delete(id);
  }
}
