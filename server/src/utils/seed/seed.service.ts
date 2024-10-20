import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Status } from '../../modules/status/status.entity';
import { Role } from '../../modules/role/role.entity';

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(
    @InjectRepository(Status)
    private readonly statusRepository: Repository<Status>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  // Status seed fonksiyonu
  async seedStatuses() {
    const statuses = [
      { name: 'active', description: 'User is active' },
      {
        name: 'blocked',
        description: 'User is blocked from accessing the system',
      },
      { name: 'pending', description: 'User registration is pending approval' },
    ];

    for (const status of statuses) {
      const existingStatus = await this.statusRepository.findOne({
        where: { name: status.name },
      });
      if (!existingStatus) {
        await this.statusRepository.save(status);
      }
    }
  }

  // Role seed fonksiyonu
  async seedRoles() {
    const roles = [
      { name: 'admin', description: 'Administrator role' },
      { name: 'user', description: 'Default user role' },
      { name: 'moderator', description: 'Moderator role' },
    ];

    for (const role of roles) {
      const existingRole = await this.roleRepository.findOne({
        where: { name: role.name },
      });
      if (!existingRole) {
        await this.roleRepository.save(role);
      }
    }
  }

  // Tüm seed fonksiyonlarını tek bir fonksiyonda çalıştırma
  async seedAll() {
    await this.seedStatuses();
    await this.seedRoles();
  }

  // onModuleInit ile modül başlatıldığında seed işlemlerini tetikleme
  async onModuleInit() {
    await this.seedAll(); // Tüm seed işlemlerini başlatıyoruz
  }
}
