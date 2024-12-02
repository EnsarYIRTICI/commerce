import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@modules/user/user.entity';
import { Role } from '@modules/user/role/role.entity';
import { Status } from '@modules/user/status/status.entity';
import { Repository } from 'typeorm';
import { RegisterDto } from '@modules/auth/dto/register.dto';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,

    @InjectRepository(Status)
    private readonly statusRepository: Repository<Status>,
  ) {}

  async findAdmin(email: string) {
    return await this.userRepository.findOne({ where: { email } });
  }

  async createAdmin(registerDto: RegisterDto) {
    const role = await this.roleRepository.findOne({
      where: { name: 'admin' },
    });
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
      createdAt: new Date(),
      role,
      status,
    });

    return await this.userRepository.save(user);
  }
}
