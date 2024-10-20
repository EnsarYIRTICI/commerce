import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@modules/user/user.entity'; // User entity
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user || user.password !== password) {
      return null;
    }

    return user;
  }

  async create(registerDto: RegisterDto, date: Date) {
    const user = this.userRepository.create({
      ...registerDto,
      createdAt: date,
    });
    return await this.userRepository.save(user);
  }
}
