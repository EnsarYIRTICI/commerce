import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findAll() {
    return this.userRepository.find();
  }

  async findOne(id: number) {
    return await this.userRepository.findOne({
      where: { id: id },
      relations: {
        role: true,
        status: true,
      },
    });
  }

  create(user: User) {
    return this.userRepository.save(user);
  }

  update(id: number, user: User) {
    return this.userRepository.update(id, user);
  }

  delete(id: number) {
    return this.userRepository.delete(id);
  }
}
