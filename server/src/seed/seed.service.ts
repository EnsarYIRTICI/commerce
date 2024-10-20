import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Status } from '../modules/status/status.entity';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(Status)
    private readonly statusRepository: Repository<Status>,
  ) {}

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
}
