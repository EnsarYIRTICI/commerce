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

  async findOne(id: number) {
    return await this.userRepository.findOne({
      where: { id: id },
      relations: {
        role: true,
        status: true,
      },
    });
  }

  async findOneByEmail(email: string) {
    return await this.userRepository.findOne({
      where: { email: email },
      relations: {
        role: true,
        status: true,
      },
    });
  }

  async findAll() {
    return await this.userRepository.find();
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
