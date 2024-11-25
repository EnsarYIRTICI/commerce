import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Address } from './address.entity';
import { User } from '@modules/user/user.entity';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
  ) {}

  async validateUserAddressById(user: User, addressId: number) {
    return await this.addressRepository.findOne({
      where: {
        id: addressId,
        user: {
          id: user.id,
        },
      },
    });
  }

  findAll() {
    return this.addressRepository.find();
  }

  findOne(id: number) {
    return this.addressRepository.findOne({ where: { id } });
  }

  create(address: Address) {
    return this.addressRepository.save(address);
  }

  update(id: number, address: Address) {
    return this.addressRepository.update(id, address);
  }

  delete(id: number) {
    return this.addressRepository.delete(id);
  }
}
