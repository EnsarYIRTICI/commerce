import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@modules/user/user.entity';
import { In, Repository } from 'typeorm';
import { Address } from '@modules/address/address.entity';
import { UserService } from '@modules/user/user.service';
import { AddressService } from '@modules/address/address.service';

@Injectable()
export class AddressDomain {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,

    private readonly userService: UserService,
    private readonly addressService: AddressService,
  ) {}

  async findUserAddressesById(user: User, addressId: number) {
    return await this.addressRepository.findOne({
      where: {
        id: addressId,
        user: {
          id: user.id,
        },
      },
    });
  }
}
