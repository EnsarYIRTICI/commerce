import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@modules/user/user.entity'; // User entity

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async validateUser(email: string, password: string) {
    // Email ile kullanıcıyı buluyoruz
    const user = await this.userRepository.findOne({ where: { email } });

    // Şifre kontrolü (şifre hash'li olmalı)
    if (!user || user.password !== password) {
      return null;
    }

    return user;
  }

  async register(registerDto: any) {
    const user = this.userRepository.create(registerDto);
    return await this.userRepository.save(user);
  }
}
