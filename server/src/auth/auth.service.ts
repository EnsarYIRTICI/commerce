import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/register.dto';
import { User } from '@modules/user/user.entity';
import { Role } from '@modules/role/role.entity';
import { Status } from '@modules/status/status.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,

    @InjectRepository(Status)
    private readonly statusRepository: Repository<Status>,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user || user.password !== password) {
      return null;
    }

    return user;
  }

  async create(registerDto: RegisterDto, date: Date) {
    const role = await this.roleRepository.findOne({ where: { name: 'user' } });
    if (!role) {
      throw new Error('User role not found');
    }

    const status = await this.statusRepository.findOne({
      where: { name: 'active' },
    });
    if (!status) {
      throw new Error('Active status not found');
    }

    const user = this.userRepository.create({
      ...registerDto,
      createdAt: date,
      role,
      status,
    });

    return await this.userRepository.save(user);
  }
}
