import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@modules/user/user.entity';
import { CreateAddressDto } from './dto/createAddress.dto';
import { Address } from './entities/address.entity';

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

  async findAll() {
    return await this.addressRepository.find({
      relations: {
        user: true,
      },
    });
  }

  findOne(id: number) {
    return this.addressRepository.findOne({ where: { id } });
  }

  async create(createAddressDto: CreateAddressDto, user: User) {
    let address = this.addressRepository.create({
      ...createAddressDto,
      user: user,
    });

    return await this.addressRepository.save(address);
  }

  update(id: number, address: Address) {
    return this.addressRepository.update(id, address);
  }

  delete(id: number) {
    return this.addressRepository.delete(id);
  }
}
