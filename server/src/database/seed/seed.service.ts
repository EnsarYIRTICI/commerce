import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Status } from '@modules/status/status.entity';
import { Role } from '@modules/role/role.entity';
import { OrderStatus } from '@modules/order_status/order_status.entity';

interface SeedData {
  repository: Repository<any>;
  data: Array<{ [key: string]: any }>;
  uniqueField: string;
}

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(
    @InjectRepository(Status)
    private readonly statusRepository: Repository<Status>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(OrderStatus)
    private readonly orderStatusRepository: Repository<OrderStatus>,
  ) {}

  // Genel seed fonksiyonu

  async seed<T>(
    repository: Repository<T> | any,
    data: Array<{ [key: string]: any }>,
    uniqueField: string,
  ): Promise<void> {
    for (const item of data) {
      const existingItem = await repository.findOne({
        where: { [uniqueField]: item[uniqueField] },
      });
      if (!existingItem) {
        await repository.save(item);
      }
    }
  }

  async seedAll() {
    // Veri kümelerini ve ilgili repository bilgilerini tutan yapı

    const seedData: SeedData[] = [
      {
        repository: this.statusRepository,
        data: [
          { name: 'active', description: 'User is active' },
          {
            name: 'blocked',
            description: 'User is blocked from accessing the system',
          },
          {
            name: 'pending',
            description: 'User registration is pending approval',
          },
        ],
        uniqueField: 'name',
      },
      {
        repository: this.roleRepository,
        data: [
          { name: 'admin', description: 'Administrator role' },
          { name: 'user', description: 'Default user role' },
          { name: 'moderator', description: 'Moderator role' },
        ],
        uniqueField: 'name',
      },
      {
        repository: this.orderStatusRepository,
        data: [
          { name: 'pending', description: 'Order is pending' },
          { name: 'shipped', description: 'Order has been shipped' },
          { name: 'delivered', description: 'Order has been delivered' },
          { name: 'canceled', description: 'Order has been canceled' },
        ],
        uniqueField: 'name',
      },
    ];

    // Her veri kümesi için genel seed fonksiyonunu çağırıyoruz

    for (const seed of seedData) {
      await this.seed(seed.repository, seed.data, seed.uniqueField);
    }
  }

  async onModuleInit() {
    await this.seedAll();
  }
}
